import React, { useState, useEffect } from 'react';
import {
  Box, Typography, IconButton, Button, TextField, InputAdornment, Divider, Chip,
  Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, Snackbar, Alert, Tooltip, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'; // أيقونة النشر
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined'; // أيقونة إلغاء النشر
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'; // أيقونة "الكل"

// --- نظام الألوان ---
const colors = {
  gold: '#D4AF37', black: '#141414', lightBlack: '#232323',
  white: '#FFFFFF', textDark: '#000000', textLight: alpha('#FFFFFF', 0.8),
  error: '#d32f2f', success: '#66bb6a', info: '#29b6f6', grey: '#888'
};

// --- البيانات التجريبية المحدثة ---
const initialLaws = [
    { 
        id: 1, title: 'قانون العمل السعودي', category: 'قانون العمل', 
        summary: 'ينظم هذا القانون العلاقات بين أصحاب العمل والعمال في المملكة.', 
        fullContent: 'يحدد قانون العمل السعودي حقوق وواجبات كل من العامل وصاحب العمل...',
        status: 'published' // منشور
    },
    { 
        id: 2, title: 'نظام الشركات', category: 'القانون التجاري', 
        summary: 'يهدف إلى تنظيم أحكام الشركات في المملكة وتعزيز بيئة الاستثمار.', 
        fullContent: 'يعالج نظام الشركات السعودي الأحكام المتعلقة بتأسيس الشركات وأنواعها...',
        status: 'unpublished' // غير منشور
    },
    {
        id: 3, title: 'نظام المرافعات الشرعية', category: 'قانون إجرائي',
        summary: 'مجموعة القواعد التي تنظم إجراءات التقاضي أمام المحاكم.',
        fullContent: 'يتناول النظام اختصاصات المحاكم، وإجراءات رفع الدعوى، والحضور والغياب، وطرق الإثبات، والطعن في الأحكام.',
        status: 'archived' // مؤرشف
    }
];

const newLawInitialState = { title: '', category: '', summary: '', fullContent: '' };

// --- المكونات المصممة ---
const SearchTextField = styled(TextField)({ '& .MuiInput-underline:before': { borderBottomColor: alpha(colors.white, 0.4) },'&:hover .MuiInput-underline:before': { borderBottomColor: colors.gold },'& .MuiInput-underline:after': { borderBottomColor: colors.gold },'& .MuiInputBase-input': { color: colors.white, fontFamily: 'Cairo, sans-serif' }});
const StyledAccordion = styled(Accordion)({ backgroundColor: colors.white, color: colors.textDark, borderRadius: '8px !important', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '12px', '&:before': { display: 'none' }});
const StyledAccordionSummary = styled(AccordionSummary)({ minHeight: '64px', '& .MuiAccordionSummary-expandIconWrapper': { color: colors.textDark }});
const StyledTabs = styled(Tabs)({ minHeight: '48px', '& .MuiTabs-indicator': { backgroundColor: colors.gold, height: '3px', borderRadius: '2px' } });
const StyledTab = styled(Tab)(({ theme }) => ({ minHeight: '48px', color: alpha(colors.white, 0.7), fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', '&.Mui-selected': { color: colors.gold }, textTransform: 'none', fontSize: '0.8rem', gap: theme.spacing(0.75) }));
const EmptyState = ({ message, tab }) => {
    const messages = {
        0: 'لا توجد قوانين تطابق بحثك',
        1: 'لا توجد قوانين منشورة حالياً',
        2: 'لا توجد قوانين غير منشورة حالياً',
        3: 'الأرشيف فارغ حالياً'
    };
    return (<Box sx={{ textAlign: 'center', p: 8, color: colors.textLight }}><FindInPageOutlinedIcon sx={{ fontSize: 80, mb: 2, color: alpha(colors.white, 0.3) }} /><Typography variant="h6" fontWeight="bold">{messages[tab]}</Typography><Typography variant="body1">{message}</Typography></Box>);
}


export default function LawyersManagement() {
  const [laws, setLaws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [currentTab, setCurrentTab] = useState(0); // 0: الكل, 1: منشورة, 2: غير منشورة, 3: الأرشيف
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentLaw, setCurrentLaw] = useState(null);
  const [newLawData, setNewLawData] = useState(newLawInitialState);

  useEffect(() => { setTimeout(() => { setLaws(initialLaws); setLoading(false); }, 1000); }, []);

  const showSnackbar = (message, severity) => setSnackbar({ open: true, message, severity });
  const handleTabChange = (_, newValue) => { setCurrentTab(newValue); setExpanded(false); };
  const handleAccordionChange = (panel) => (_, isExpanded) => setExpanded(isExpanded ? panel : false);

  // --- Handlers for Law Status ---
  const handlePublish = (id) => { setLaws(laws.map(l => l.id === id ? { ...l, status: 'published' } : l)); showSnackbar('تم نشر القانون بنجاح', 'success'); };
  const handleUnpublish = (id) => { setLaws(laws.map(l => l.id === id ? { ...l, status: 'unpublished' } : l)); showSnackbar('تم إلغاء نشر القانون', 'info'); };
  const handleArchive = (id) => { setLaws(laws.map(l => l.id === id ? { ...l, status: 'archived' } : l)); showSnackbar('تم نقل القانون إلى الأرشيف', 'info'); };
  const handleUnarchive = (id) => { setLaws(laws.map(l => l.id === id ? { ...l, status: 'unpublished' } : l)); showSnackbar('تمت استعادة القانون (غير منشور)', 'success'); };
  const handlePermanentDelete = (id) => { setLaws(laws.filter(l => l.id !== id)); showSnackbar('تم حذف القانون نهائياً', 'error'); };

  // --- Handlers for Dialogs ---
  const handleEditClick = (law) => { setCurrentLaw({ ...law }); setIsEditDialogOpen(true); };
  const handleEditDialogClose = () => { setIsEditDialogOpen(false); setCurrentLaw(null); };
  const handleSaveChanges = () => { setLaws(laws.map(law => law.id === currentLaw.id ? currentLaw : law)); handleEditDialogClose(); showSnackbar('تم حفظ التعديلات!', 'success'); };
  
  const handleAddClick = () => setIsAddDialogOpen(true);
  const handleAddDialogClose = () => { setIsAddDialogOpen(false); setNewLawData(newLawInitialState); };
  const handleAddNewLaw = () => { const newLaw = { id: Date.now(), status: 'unpublished', ...newLawData }; setLaws([newLaw, ...laws]); handleAddDialogClose(); showSnackbar('تمت إضافة قانون جديد (غير منشور)', 'success'); };
  
  const handleFormChange = (e, formType) => { const { name, value } = e.target; if (formType === 'edit') { setCurrentLaw({ ...currentLaw, [name]: value }); } else { setNewLawData({ ...newLawData, [name]: value }); } };

  // --- Filtering Logic ---
  const searchFilter = (law) => {
      const query = searchQuery.toLowerCase();
      if (!query) return true;
      return ( law.title.toLowerCase().includes(query) || law.category.toLowerCase().includes(query) || law.summary.toLowerCase().includes(query) || law.fullContent.toLowerCase().includes(query) );
  };

  const allActiveLaws = laws.filter(l => l.status !== 'archived' && searchFilter(l));
  const publishedLaws = laws.filter(l => l.status === 'published' && searchFilter(l));
  const unpublishedLaws = laws.filter(l => l.status === 'unpublished' && searchFilter(l));
  const archivedLaws = laws.filter(l => l.status === 'archived' && searchFilter(l));

  let lawsToDisplay = [];
  switch (currentTab) {
      case 0: lawsToDisplay = allActiveLaws; break;
      case 1: lawsToDisplay = publishedLaws; break;
      case 2: lawsToDisplay = unpublishedLaws; break;
      case 3: lawsToDisplay = archivedLaws; break;
      default: lawsToDisplay = allActiveLaws;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: 'Cairo, sans-serif', color: colors.white }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>إدارة القوانين والتشريعات</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
        <SearchTextField variant="standard" placeholder="ابحث في العنوان، الفئة، المحتوى..." sx={{ flexGrow: 1 }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: alpha(colors.white, 0.6) }} /></InputAdornment>)}}/>
        <Button onClick={handleAddClick} variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: colors.gold, color: colors.black, fontWeight: 'bold', padding: '10px 24px', borderRadius: '12px', '&:hover': { backgroundColor: '#B4943C' }}}>إضافة قانون</Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <StyledTabs value={currentTab} onChange={handleTabChange}>
          <StyledTab label="الكل" icon={<Chip label={allActiveLaws.length} size="small" sx={{bgcolor: colors.info, color: colors.white, height: '18px', fontSize: '0.7rem'}}/>} />
          <StyledTab label="منشورة" icon={<Chip label={publishedLaws.length} size="small" sx={{bgcolor: colors.success, color: colors.white, height: '18px', fontSize: '0.7rem'}}/>} />
          <StyledTab label="غير منشورة" icon={<Chip label={unpublishedLaws.length} size="small" sx={{bgcolor: colors.grey, color: colors.white, height: '18px', fontSize: '0.7rem'}}/>} />
          <StyledTab label="الأرشيف" icon={<Chip label={archivedLaws.length} size="small" sx={{height: '18px', fontSize: '0.7rem'}}/>} />
        </StyledTabs>
      </Box>

      {loading ? ( Array.from(new Array(3)).map((_, i) => <Skeleton key={i} variant="rectangular" height={64} sx={{ borderRadius: '8px', mb: 1.5, bgcolor: colors.lightBlack }} />)
      ) : lawsToDisplay.length > 0 ? (
        lawsToDisplay.map((law) => (
          <StyledAccordion key={law.id} expanded={expanded === law.id} onChange={handleAccordionChange(law.id)}>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="h6" fontWeight="bold">{law.title}</Typography></StyledAccordionSummary>
            <AccordionDetails>
              <Chip label={law.category} size="small" sx={{ backgroundColor: alpha(colors.gold, 0.1), color: colors.gold, fontWeight: 'bold' }} />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: colors.textDark }}>ملخص القانون</Typography>
              <Typography variant="body1" sx={{ color: alpha(colors.textDark, 0.8), lineHeight: 1.8, mb: 3, whiteSpace: 'pre-line' }}>{law.summary}</Typography>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: colors.textDark }}>شرح كامل عن القانون</Typography>
              <Typography variant="body1" sx={{ color: alpha(colors.textDark, 0.8), lineHeight: 1.8, mb: 3, whiteSpace: 'pre-line' }}>{law.fullContent}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, borderTop: `1px solid ${alpha(colors.grey, 0.2)}`, pt: 1.5 }}>
                {law.status === 'published' && (
                  <>
                    <Tooltip title="تعديل"><IconButton onClick={() => handleEditClick(law)}><EditIcon sx={{color: colors.gold}}/></IconButton></Tooltip>
                    <Tooltip title="إلغاء النشر"><IconButton onClick={() => handleUnpublish(law.id)}><CloudOffOutlinedIcon sx={{color: colors.info}}/></IconButton></Tooltip>
                    <Tooltip title="أرشفة"><IconButton onClick={() => handleArchive(law.id)}><ArchiveIcon sx={{color: colors.grey}}/></IconButton></Tooltip>
                  </>
                )}
                {law.status === 'unpublished' && (
                  <>
                    <Tooltip title="تعديل"><IconButton onClick={() => handleEditClick(law)}><EditIcon sx={{color: colors.gold}}/></IconButton></Tooltip>
                    <Tooltip title="نشر"><IconButton onClick={() => handlePublish(law.id)}><CloudUploadOutlinedIcon sx={{color: colors.success}}/></IconButton></Tooltip>
                    <Tooltip title="أرشفة"><IconButton onClick={() => handleArchive(law.id)}><ArchiveIcon sx={{color: colors.grey}}/></IconButton></Tooltip>
                  </>
                )}
                {law.status === 'archived' && (
                  <>
                    <Tooltip title="استعادة"><IconButton onClick={() => handleUnarchive(law.id)}><UnarchiveIcon sx={{color: colors.success}} /></IconButton></Tooltip>
                    <Tooltip title="حذف نهائي"><IconButton onClick={() => handlePermanentDelete(law.id)}><DeleteForeverIcon sx={{color: colors.error}} /></IconButton></Tooltip>
                  </>
                )}
              </Box>
            </AccordionDetails>
          </StyledAccordion>
        ))
      ) : ( <EmptyState message={searchQuery ? "لم يتم العثور على نتائج لبحثك." : ""} tab={currentTab}/> )}
      
      {/* --- Dialogs for Add/Edit --- */}
      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose} fullWidth maxWidth="sm" PaperProps={{sx: { backgroundColor: colors.lightBlack, color: colors.white, borderRadius: '16px' }}}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>إضافة قانون جديد</DialogTitle>
        <DialogContent sx={{ pt: '20px !important', mt: 1 }}>
          <TextField autoFocus name="title" label="عنوان القانون" fullWidth variant="filled" onChange={(e) => handleFormChange(e, 'add')} sx={{ mb: 2 }} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
          <TextField name="category" label="فئة القانون" fullWidth variant="filled" onChange={(e) => handleFormChange(e, 'add')} sx={{ mb: 2 }} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
          <TextField name="summary" label="ملخص القانون" fullWidth multiline rows={3} variant="filled" onChange={(e) => handleFormChange(e, 'add')} sx={{ mb: 2 }} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
          <TextField name="fullContent" label="المحتوى الكامل" fullWidth multiline rows={6} variant="filled" onChange={(e) => handleFormChange(e, 'add')} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}><Button onClick={handleAddDialogClose} sx={{ color: colors.textLight }}>إلغاء</Button><Button onClick={handleAddNewLaw} variant="contained" sx={{ backgroundColor: colors.gold, color: colors.black, '&:hover': { backgroundColor: '#B4943C' } }}>حفظ</Button></DialogActions>
      </Dialog>
      {currentLaw && (
        <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose} fullWidth maxWidth="sm" PaperProps={{sx: { backgroundColor: colors.lightBlack, color: colors.white, borderRadius: '16px' }}}>
          <DialogTitle sx={{ fontWeight: 'bold' }}>تعديل بيانات القانون</DialogTitle>
          <DialogContent sx={{ pt: '20px !important', mt: 1 }}>
            <TextField autoFocus name="title" label="عنوان القانون" fullWidth variant="filled" value={currentLaw.title} onChange={(e) => handleFormChange(e, 'edit')} sx={{ mb: 2 }} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
            <TextField name="category" label="فئة القانون" fullWidth variant="filled" value={currentLaw.category} onChange={(e) => handleFormChange(e, 'edit')} sx={{ mb: 2 }} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
            <TextField name="summary" label="ملخص القانون" fullWidth multiline rows={3} variant="filled" value={currentLaw.summary} onChange={(e) => handleFormChange(e, 'edit')} sx={{ mb: 2 }} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
            <TextField name="fullContent" label="المحتوى الكامل" fullWidth multiline rows={6} variant="filled" value={currentLaw.fullContent} onChange={(e) => handleFormChange(e, 'edit')} InputLabelProps={{ sx: { color: colors.textLight } }} InputProps={{ sx: { color: colors.white, backgroundColor: colors.black, borderRadius:'4px' } }} />
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}><Button onClick={handleEditDialogClose} sx={{ color: colors.textLight }}>إلغاء</Button><Button onClick={handleSaveChanges} variant="contained" sx={{ backgroundColor: colors.gold, color: colors.black, '&:hover': { backgroundColor: '#B4943C' } }}>حفظ</Button></DialogActions>
        </Dialog>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} sx={{ width: '100%', fontWeight: 'bold' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}