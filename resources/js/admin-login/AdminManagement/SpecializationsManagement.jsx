import React, { useState, useEffect } from 'react';
import {
  Box, Typography, IconButton, Button, TextField, InputAdornment, Divider, Chip,
  Tabs, Tab, Snackbar, Alert, Tooltip, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

// --- نظام الألوان والمكونات المصممة ---
const colors = {
  gold: '#D4AF37',
  black: '#141414',
  lightBlack: '#232323',
  white: '#FFFFFF',
  textDark: '#000000',
  textLight: alpha('#FFFFFF', 0.8),
  error: '#d32f2f',
  success: '#66bb6a',
  info: '#29b6f6',
  grey: '#888'
};

const SearchTextField = styled(TextField)({
  '& .MuiInput-underline:before': { borderBottomColor: alpha(colors.white, 0.4) },
  '&:hover .MuiInput-underline:before': { borderBottomColor: colors.gold },
  '& .MuiInput-underline:after': { borderBottomColor: colors.gold },
  '& .MuiInputBase-input': { color: colors.white, fontFamily: 'Cairo, sans-serif' }
});

const SpecializationItem = styled(Box)(({ theme }) => ({
  backgroundColor: colors.white,
  color: colors.textDark,
  borderRadius: '8px',
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
  }
}));

const StyledTabs = styled(Tabs)({
  minHeight: '48px',
  '& .MuiTabs-indicator': { backgroundColor: colors.gold, height: '3px', borderRadius: '2px' }
});

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: '48px',
  color: alpha(colors.white, 0.7),
  fontWeight: 'bold',
  fontFamily: 'Cairo, sans-serif',
  '&.Mui-selected': { color: colors.gold },
  textTransform: 'none',
  fontSize: '0.8rem',
  gap: theme.spacing(0.75)
}));

const EmptyState = ({ message, tab }) => (
  <Box sx={{ textAlign: 'center', p: 8, color: colors.textLight }}>
    <FindInPageOutlinedIcon sx={{ fontSize: 80, mb: 2, color: alpha(colors.white, 0.3) }} />
    <Typography variant="h6" fontWeight="bold">
      {tab === 0 ? "لا توجد اختصاصات تطابق بحثك" : "الأرشيف فارغ حالياً"}
    </Typography>
    <Typography variant="body1">{message}</Typography>
  </Box>
);

// --- مربعات الحوار (Dialogs) ---
function ConfirmationDialog({ open, onClose, onConfirm, title, message }) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: colors.lightBlack, color: colors.white, borderRadius: '12px', border: `1px solid ${alpha(colors.gold, 0.2)}` }}}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
      <DialogContent><Typography>{message}</Typography></DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: colors.textLight }}>إلغاء</Button>
        <Button onClick={onConfirm} variant="contained" color="error">تأكيد الحذف</Button>
      </DialogActions>
    </Dialog>
  );
}

function DescriptionDialog({ open, onClose, specialization }) {
  if (!specialization) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: colors.lightBlack, color: colors.white, borderRadius: '12px' }}}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>شرح عن: {specialization.name}</DialogTitle>
      <DialogContent>
        <Typography sx={{ whiteSpace: 'pre-line', lineHeight: 1.8, color: colors.textLight, pt: 1 }}>
          {specialization.description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: '16px 24px' }}>
        <Button onClick={onClose} sx={{ color: colors.textLight }}>إغلاق</Button>
      </DialogActions>
    </Dialog>
  );
}

// --- البيانات التجريبية ---
const initialSpecializations = [
    { id: 1, name: 'القانون الجنائي', description: 'يختص بالجرائم والعقوبات المترتبة عليها، ويمثل الدفاع عن المتهمين أو الادعاء العام.', status: 'active' },
    { id: 2, name: 'القانون التجاري', description: 'ينظم العلاقات والمعاملات التجارية بين الشركات والأفراد، بما في ذلك العقود، الإفلاس، والملكية الفكرية.', status: 'active' },
    { id: 3, name: 'قانون الأسرة', description: 'يعالج القضايا المتعلقة بالزواج، الطلاق، الحضانة، الميراث، والوصايا.', status: 'archived' },
    { id: 4, name: 'القانون العقاري', description: 'يتعلق بكافة المعاملات الخاصة بالعقارات من بيع وشراء وإيجار ونزاعات الملكية.', status: 'active' },
];
const newSpecializationInitialState = { name: '', description: '' };


export default function SpecializationsManagement() {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState(0); // 0: فعالة, 1: الأرشيف
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // حالات مربعات الحوار
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  // الحالة المؤقتة للعنصر المحدد
  const [currentSpecialization, setCurrentSpecialization] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setSpecializations(initialSpecializations);
      setLoading(false);
    }, 1000);
  }, []);

  const showSnackbar = (message, severity) => setSnackbar({ open: true, message, severity });
  const handleTabChange = (_, newValue) => setCurrentTab(newValue);

  // --- معالجات الإجراءات ---
  const handleArchive = (id) => { setSpecializations(specializations.map(s => s.id === id ? { ...s, status: 'archived' } : s)); showSnackbar('تم نقل الاختصاص إلى الأرشيف', 'info'); };
  const handleUnarchive = (id) => { setSpecializations(specializations.map(s => s.id === id ? { ...s, status: 'active' } : s)); showSnackbar('تمت استعادة الاختصاص بنجاح', 'success'); };
  
  const handleDeleteClick = (id) => { setItemToDelete(id); setIsConfirmOpen(true); };
  const handleConfirmDelete = () => { setSpecializations(specializations.filter(s => s.id !== itemToDelete)); showSnackbar('تم حذف الاختصاص نهائياً', 'error'); setIsConfirmOpen(false); setItemToDelete(null); };

  const handleEditClick = (spec) => { setCurrentSpecialization({ ...spec }); setIsEditDialogOpen(true); };
  const handleAddClick = () => { setCurrentSpecialization(newSpecializationInitialState); setIsAddDialogOpen(true); };

  const handleViewDescription = (spec) => {
    setCurrentSpecialization(spec);
    setIsDescriptionOpen(true);
  };
  
  const handleDialogClose = (dialogSetter) => () => {
    dialogSetter(false);
    setTimeout(() => setCurrentSpecialization(null), 300); // تأخير بسيط لتحسين الانتقال
  };
  
  const handleSaveChanges = () => { setSpecializations(specializations.map(spec => spec.id === currentSpecialization.id ? currentSpecialization : spec)); handleDialogClose(setIsEditDialogOpen)(); showSnackbar('تم حفظ التعديلات!', 'success'); };
  const handleAddNew = () => { const newSpec = { id: Date.now(), status: 'active', ...currentSpecialization }; setSpecializations([newSpec, ...specializations]); handleDialogClose(setIsAddDialogOpen)(); showSnackbar('تمت إضافة الاختصاص بنجاح!', 'success'); };
  
  const handleFormChange = (e) => setCurrentSpecialization({ ...currentSpecialization, [e.target.name]: e.target.value });

  // --- فلترة البيانات للعرض ---
  const searchFilter = (spec) => {
      const query = searchQuery.toLowerCase();
      if (!query) return true;
      return spec.name.toLowerCase().includes(query) || spec.description.toLowerCase().includes(query);
  };

  const activeSpecializations = specializations.filter(s => s.status === 'active' && searchFilter(s));
  const archivedSpecializations = specializations.filter(s => s.status === 'archived' && searchFilter(s));
  const specializationsToDisplay = currentTab === 0 ? activeSpecializations : archivedSpecializations;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: 'Cairo, sans-serif', color: colors.white, bgcolor: colors.black, minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>إدارة الاختصاصات</Typography>
      
      {/* --- شريط البحث والإضافة --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
        <SearchTextField variant="standard" placeholder="ابحث عن اختصاص..." sx={{ flexGrow: 1 }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: alpha(colors.white, 0.6) }} /></InputAdornment>)}}/>
        <Button onClick={handleAddClick} variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: colors.gold, color: colors.black, fontWeight: 'bold', padding: '10px 24px', borderRadius: '12px', '&:hover': { backgroundColor: '#B4943C' }}}>إضافة اختصاص</Button>
      </Box>

      {/* --- التبويبات (فعالة / أرشيف) --- */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <StyledTabs value={currentTab} onChange={handleTabChange}>
          <StyledTab label="الاختصاصات الفعالة" icon={<Chip label={activeSpecializations.length} size="small" sx={{bgcolor: colors.success, color: colors.white, height: '18px', fontSize: '0.7rem'}}/>} />
          <StyledTab label="الأرشيف" icon={<Chip label={archivedSpecializations.length} size="small" sx={{height: '18px', fontSize: '0.7rem'}}/>} />
        </StyledTabs>
      </Box>

      {/* --- قائمة الاختصاصات --- */}
      {loading ? (
        Array.from(new Array(3)).map((_, i) => <Skeleton key={i} variant="rectangular" height={70} sx={{ borderRadius: '8px', mb: 1.5, bgcolor: colors.lightBlack }} />)
      ) : specializationsToDisplay.length > 0 ? (
        specializationsToDisplay.map((spec) => (
          <SpecializationItem key={spec.id}>
            <Typography variant="h6" fontWeight="bold">{spec.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Button variant="outlined" endIcon={<SearchIcon />} onClick={() => handleViewDescription(spec)} sx={{ color: colors.gold, borderColor: alpha(colors.gold, 0.5), '&:hover': { borderColor: colors.gold, bgcolor: alpha(colors.gold, 0.1) }}}>عرض الشرح</Button>
                <Divider orientation="vertical" flexItem sx={{ mx: 1.5, borderColor: alpha(colors.grey, 0.2) }} />
                {spec.status === 'active' ? (
                  <>
                    <Tooltip title="تعديل"><IconButton onClick={() => handleEditClick(spec)}><EditIcon sx={{color: colors.info}}/></IconButton></Tooltip>
                    <Tooltip title="أرشفة"><IconButton onClick={() => handleArchive(spec.id)}><ArchiveIcon sx={{color: colors.grey}}/></IconButton></Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="استعادة"><IconButton onClick={() => handleUnarchive(spec.id)}><UnarchiveIcon sx={{color: colors.success}} /></IconButton></Tooltip>
                    <Tooltip title="حذف نهائي"><IconButton onClick={() => handleDeleteClick(spec.id)}><DeleteForeverIcon sx={{color: colors.error}} /></IconButton></Tooltip>
                  </>
                )}
            </Box>
          </SpecializationItem>
        ))
      ) : (
        <EmptyState message={searchQuery ? "لم يتم العثور على نتائج." : ""} tab={currentTab}/>
      )}
      
      {/* --- Dialog for Add/Edit --- */}
      <Dialog open={isAddDialogOpen || isEditDialogOpen} onClose={handleDialogClose(isAddDialogOpen ? setIsAddDialogOpen : setIsEditDialogOpen)} fullWidth maxWidth="sm" PaperProps={{sx: { backgroundColor: colors.lightBlack, color: colors.white, borderRadius: '16px' }}}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>{isAddDialogOpen ? 'إضافة اختصاص جديد' : 'تعديل الاختصاص'}</DialogTitle>
        <DialogContent sx={{ pt: '20px !important', mt: 1 }}>
          <TextField autoFocus name="name" label="نوع الاختصاص" fullWidth variant="filled" value={currentSpecialization?.name || ''} onChange={handleFormChange} sx={{ mb: 2 }} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
          <TextField name="description" label="شرح عن الاختصاص" fullWidth multiline rows={4} variant="filled" value={currentSpecialization?.description || ''} onChange={handleFormChange} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleDialogClose(isAddDialogOpen ? setIsAddDialogOpen : setIsEditDialogOpen)} sx={{ color: colors.textLight }}>إلغاء</Button>
            <Button onClick={isAddDialogOpen ? handleAddNew : handleSaveChanges} variant="contained" sx={{ backgroundColor: colors.gold, color: colors.black, '&:hover': { backgroundColor: '#B4943C' } }}>حفظ</Button>
        </DialogActions>
      </Dialog>
      
      {/* --- Dialog for Description --- */}
      <DescriptionDialog
        open={isDescriptionOpen}
        onClose={handleDialogClose(setIsDescriptionOpen)}
        specialization={currentSpecialization}
      />

      {/* --- Dialog for Delete Confirmation --- */}
      <ConfirmationDialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="تأكيد الحذف"
        message="هل أنت متأكد أنك تريد حذف هذا الاختصاص نهائياً؟ لا يمكن التراجع عن هذا الإجراء."
      />

      {/* --- Snackbar for Notifications --- */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} sx={{ width: '100%', fontWeight: 'bold' }} variant="filled">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}