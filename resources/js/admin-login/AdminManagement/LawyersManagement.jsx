import React, { useState } from 'react';
import {
    Box, Typography, Button, Tabs, Tab, Card, Avatar, Grid, CardContent,
    CardActions, Divider, IconButton, Tooltip, Chip, TextField, InputAdornment,
    ToggleButtonGroup, ToggleButton, Dialog, DialogContent, DialogActions, DialogTitle
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

// Icons
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// --- Color Scheme & Styled Components ---
const colors = { gold: '#D4AF37', darkGold: '#B4943C', black: '#1A1A1A', white: '#FFFFFF', lightBlack: '#232323', textSecondary: alpha('#FFFFFF', 0.7) };
const ManagementHeader = styled(Card)(({ theme }) => ({ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(4), padding: theme.spacing(3), borderRadius: '16px', background: `linear-gradient(135deg, ${colors.lightBlack} 0%, ${colors.black} 100%)`, border: `1px solid ${alpha(colors.gold, 0.2)}`, color: colors.white }));
const StyledTabs = styled(Tabs)({ '& .MuiTabs-indicator': { backgroundColor: colors.gold, height: '3px' } });
const StyledTab = styled(Tab)(({ theme }) => ({ color: colors.textSecondary, fontFamily: 'Cairo, sans-serif', fontWeight: 'bold', '&.Mui-selected': { color: colors.gold } }));
const UserCardStyled = styled(Card)({ background: colors.lightBlack, color: colors.white, borderRadius: '16px', border: `1px solid ${alpha(colors.gold, 0.1)}`, display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 10px 20px ${alpha(colors.black, 0.5)}` } });
const SearchBar = styled(TextField)({ '& .MuiInputBase-root': { color: colors.white, borderRadius: '8px', backgroundColor: colors.lightBlack }, '& .MuiOutlinedInput-root fieldset': { borderColor: alpha(colors.gold, 0.3) } });
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({ backgroundColor: colors.lightBlack, border: `1px solid ${alpha(colors.gold, 0.2)}`, borderRadius: '8px', }));
const StyledToggleButton = styled(ToggleButton)({ color: colors.textSecondary, fontFamily: 'Cairo, sans-serif', fontWeight: 'bold', border: 'none', padding: '8px 16px', '&.Mui-selected, &.Mui-selected:hover': { color: colors.black, backgroundColor: colors.gold, }, '&:hover': { backgroundColor: alpha(colors.gold, 0.1), } });

// --- Dialogs (Placeholders) ---
const EditLawyerDialog = ({ open, onClose, lawyer, onSave }) => {
    if (!open) return null;
    return (
        <Dialog open={open} onClose={onClose}><DialogContent><Typography>Edit Lawyer: {lawyer?.name}</Typography></DialogContent><DialogActions><Button onClick={onClose}>إلغاء</Button><Button onClick={() => onSave(lawyer)}>حفظ</Button></DialogActions></Dialog>
    );
};
const EditEmployeeDialog = ({ open, onClose, employee, onSave }) => {
    if (!open) return null;
    return (
        <Dialog open={open} onClose={onClose}><DialogContent><Typography>Edit Employee: {employee?.name}</Typography></DialogContent><DialogActions><Button onClick={onClose}>إلغاء</Button><Button onClick={() => onSave(employee)}>حفظ</Button></DialogActions></Dialog>
    );
};

// --- Confirmation Dialog Component ---
function ConfirmationDialog({ open, onClose, onConfirm, title, message }) {
  if (!open) return null;
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: colors.lightBlack, color: colors.white, borderRadius: '12px', border: `1px solid ${alpha(colors.gold, 0.2)}`, fontFamily: 'Cairo, sans-serif' } }}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ color: colors.textSecondary, fontFamily: 'Cairo, sans-serif' }}>إلغاء</Button>
        <Button onClick={onConfirm} variant="contained" color="error" sx={{ fontFamily: 'Cairo, sans-serif', bgcolor: '#D32F2F', '&:hover': { bgcolor: '#B71C1C'} }}>تأكيد الحذف</Button>
      </DialogActions>
    </Dialog>
  );
}

// --- Mock Data ---
const initialLawyers = [
    { id: 1, name: 'أحمد المصري', specialty: 'قانون جنائي', email: 'ahmad@example.com', phone: '0501234567', status: 'active' },
    { id: 2, name: 'فاطمة الزهراء', specialty: 'قانون تجاري', email: 'fatima@example.com', phone: '0502345678', status: 'active' },
    { id: 3, name: 'خالد الغامدي', specialty: 'قانون أسرة', email: 'khalid@example.com', phone: '0503456789', status: 'archived' },
];
const initialEmployees = [
    { id: 1, name: 'سارة عبد الله', position: 'مديرة مكتب', email: 'sara@example.com', phone: '0551234567', status: 'active' },
    { id: 2, name: 'محمد علي', position: 'مساعد إداري', email: 'mohammad@example.com', phone: '0552345678', status: 'active' },
    { id: 3, name: 'علي حسن', position: 'باحث قانوني', email: 'ali@example.com', phone: '0553456789', status: 'archived' },
];

// --- UserCard Component ---
function UserCard({ user, type, onEdit, onArchive, onUnarchive, onView, onDelete }) {
    return (
        <UserCardStyled>
            <CardContent sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
                <Avatar sx={{ width: 80, height: 80, margin: '0 auto 16px', bgcolor: colors.gold, color: colors.black, fontSize: 32 }}>{user.name.charAt(0)}</Avatar>
                <Typography variant="h6" fontWeight="bold" noWrap>{user.name}</Typography>
                <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 1 }}>{type === 'lawyer' ? user.specialty : user.position}</Typography>
                <Chip label={user.status === 'active' ? 'نشط' : 'مؤرشف'} size="small" sx={{ bgcolor: user.status === 'active' ? alpha(colors.gold, 0.3) : '#555', color: colors.white }} />
            </CardContent>
            <Divider sx={{ borderColor: alpha(colors.gold, 0.1) }} />
            <CardActions sx={{ justifyContent: 'center', background: alpha(colors.black, 0.3), py: 1 }}>
                <Tooltip title="عرض التفاصيل"><IconButton onClick={() => onView(user, type)} size="small" sx={{ color: colors.textSecondary }}><VisibilityOutlinedIcon /></IconButton></Tooltip>
                <Tooltip title="تعديل البيانات"><IconButton onClick={() => onEdit(user, type)} size="small" sx={{ color: colors.textSecondary }}><EditIcon /></IconButton></Tooltip>
                {user.status === 'active' ? (<Tooltip title="أرشفة"><IconButton onClick={() => onArchive(user)} size="small" sx={{ color: colors.textSecondary }}><ArchiveOutlinedIcon /></IconButton></Tooltip>) : (<Tooltip title="إلغاء الأرشفة"><IconButton onClick={() => onUnarchive(user)} size="small" sx={{ color: colors.textSecondary }}><UnarchiveOutlinedIcon /></IconButton></Tooltip>)}
                <Tooltip title="حذف نهائي"><IconButton onClick={() => onDelete(user)} size="small" sx={{ color: colors.textSecondary }}><DeleteOutlineIcon /></IconButton></Tooltip>
            </CardActions>
        </UserCardStyled>
    );
}

// --- UserDetailsDialog Component ---
function UserDetailsDialog({ open, onClose, user }) {
    if (!user) return null;
    const isLawyer = user.type === 'lawyer';
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: colors.lightBlack, color: colors.white, borderRadius: '16px', border: `1px solid ${alpha(colors.gold, 0.2)}` } }}>
            <DialogContent sx={{ p: 4, position: 'relative' }}>
                <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, left: 8, color: colors.textSecondary }}><CloseIcon /></IconButton>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ width: 120, height: 120, bgcolor: colors.gold, fontSize: 48, color: colors.black, mb: 2 }}>{user.name.charAt(0)}</Avatar>
                    <Typography variant="h4" fontWeight="bold">{user.name}</Typography>
                    <Typography color={colors.gold} variant="h6">{isLawyer ? user.specialty : user.position}</Typography>
                    <Chip label={user.status === 'active' ? 'نشط' : 'مؤرشف'} size="small" sx={{ bgcolor: user.status === 'active' ? alpha(colors.gold, 0.3) : '#555', color: colors.white, mt: 1 }} />
                </Box>
                <Divider sx={{ my: 2, borderColor: alpha(colors.white, 0.1) }} />
                <Grid container spacing={2} sx={{ textAlign: 'right', fontFamily: 'Cairo, sans-serif' }}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><EmailOutlinedIcon sx={{ color: colors.gold }} /><Box><Typography color={colors.textSecondary}>البريد الإلكتروني</Typography><Typography>{user.email}</Typography></Box></Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><PhoneOutlinedIcon sx={{ color: colors.gold }} /><Box><Typography color={colors.textSecondary}>رقم الهاتف</Typography><Typography>{user.phone}</Typography></Box></Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default function ManagementPage() {
    const [mainTab, setMainTab] = useState(0);
    const navigate = useNavigate();

    // --- State Management ---
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [lawyers, setLawyers] = useState(initialLawyers);
    const [employees, setEmployees] = useState(initialEmployees);
    const [editLawyerOpen, setEditLawyerOpen] = useState(false);
    const [selectedLawyer, setSelectedLawyer] = useState(null);
    const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewUserOpen, setViewUserOpen] = useState(false);
    const [selectedUserForView, setSelectedUserForView] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // --- Filtering Logic ---
    const filteredLawyers = lawyers.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterStatus === 'all' || l.status === filterStatus));
    const filteredEmployees = employees.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterStatus === 'all' || e.status === filterStatus));

    // --- Event Handlers ---
    const handleSearchChange = (event) => setSearchTerm(event.target.value);
    const handleFilterChange = (_, newFilter) => { if (newFilter !== null) setFilterStatus(newFilter); };
    const handleMainTabChange = (_, newValue) => { setMainTab(newValue); setSearchTerm(''); setFilterStatus('all'); };

    const handleViewUser = (user, type) => { setSelectedUserForView({ ...user, type }); setViewUserOpen(true); };
    const handleCloseViewDialog = () => { setViewUserOpen(false); setSelectedUserForView(null); };

    // --- Handlers ---
    const handleEditLawyer = (lawyer) => { setSelectedLawyer(lawyer); setEditLawyerOpen(true); };
    const handleSaveEditLawyer = (editedLawyer) => { setLawyers(lawyers.map(l => l.id === editedLawyer.id ? editedLawyer : l)); setEditLawyerOpen(false); };
    const handleArchiveLawyer = (lawyer) => { setLawyers(lawyers.map(l => l.id === lawyer.id ? { ...l, status: 'archived' } : l)); };
    const handleUnarchiveLawyer = (lawyer) => { setLawyers(lawyers.map(l => l.id === lawyer.id ? { ...l, status: 'active' } : l)); };

    const handleEditEmployee = (employee) => { setSelectedEmployee(employee); setEditEmployeeOpen(true); };
    const handleSaveEditEmployee = (editedEmployee) => { setEmployees(employees.map(e => e.id === editedEmployee.id ? editedEmployee : e)); setEditEmployeeOpen(false); };
    const handleArchiveEmployee = (employee) => { setEmployees(employees.map(e => e.id === employee.id ? { ...e, status: 'archived' } : e)); };
    const handleUnarchiveEmployee = (employee) => { setEmployees(employees.map(e => e.id === employee.id ? { ...e, status: 'active' } : e)); };
    
    // --- Delete Flow Handlers ---
    const handleDeleteUser = (user, type) => {
        setUserToDelete({ ...user, type });
        setConfirmDeleteOpen(true);
    };
    
    const handleConfirmDelete = () => {
        if (!userToDelete) return;
        if (userToDelete.type === 'lawyer') {
            setLawyers(prev => prev.filter(l => l.id !== userToDelete.id));
        } else {
            setEmployees(prev => prev.filter(e => e.id !== userToDelete.id));
        }
        setConfirmDeleteOpen(false);
        setUserToDelete(null);
    };

    const renderControls = () => (
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} mb={3} flexWrap="wrap">
            <SearchBar variant="outlined" placeholder="ابحث بالاسم..." value={searchTerm} onChange={handleSearchChange} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: colors.gold }} /></InputAdornment>), }} sx={{ flexGrow: 1, minWidth: '250px' }} />
            <StyledToggleButtonGroup value={filterStatus} exclusive onChange={handleFilterChange}>
                <StyledToggleButton value="all">الكل</StyledToggleButton>
                <StyledToggleButton value="active">النشطين</StyledToggleButton>
                <StyledToggleButton value="archived">المؤرشفين</StyledToggleButton>
            </StyledToggleButtonGroup>
        </Box>
    );

    return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#121212', minHeight: '100vh', color: colors.white }}>
        <ManagementHeader>
            <Avatar sx={{ bgcolor: colors.gold, color: colors.black, width: 56, height: 56, mr: 2 }}><PeopleAltOutlinedIcon /></Avatar>
            <Box><Typography variant="h4" fontWeight="bold">إدارة المستخدمين</Typography><Typography variant="body1" color={colors.textSecondary}>إدارة المحامين والموظفين في النظام</Typography></Box>
        </ManagementHeader>
        
        <StyledTabs value={mainTab} onChange={handleMainTabChange} sx={{ mb: 3 }} centered>
            <StyledTab icon={<GavelOutlinedIcon />} iconPosition="start" label="المحامون" />
            <StyledTab icon={<BusinessCenterOutlinedIcon />} iconPosition="start" label="الموظفون" />
        </StyledTabs>

        {mainTab === 0 && (
            <Box>
                {renderControls()}
                <Grid container spacing={3}>
                    {filteredLawyers.map(l => <Grid item xs={12} sm={6} md={4} key={l.id}><UserCard user={l} type="lawyer" onView={handleViewUser} onEdit={handleEditLawyer} onDelete={() => handleDeleteUser(l, 'lawyer')} onArchive={handleArchiveLawyer} onUnarchive={handleUnarchiveLawyer}/></Grid>)}
                </Grid>
            </Box>
        )}

        {mainTab === 1 && (
            <Box>
                {renderControls()}
                <Grid container spacing={3}>
                    {filteredEmployees.map(e => <Grid item xs={12} sm={6} md={4} key={e.id}><UserCard user={e} type="employee" onView={handleViewUser} onEdit={handleEditEmployee} onDelete={() => handleDeleteUser(e, 'employee')} onArchive={handleArchiveEmployee} onUnarchive={handleUnarchiveEmployee} /></Grid>)}
                </Grid>
            </Box>
        )}
        
        <EditLawyerDialog open={editLawyerOpen} onClose={() => setEditLawyerOpen(false)} lawyer={selectedLawyer} onSave={handleSaveEditLawyer} />
        <EditEmployeeDialog open={editEmployeeOpen} onClose={() => setEditEmployeeOpen(false)} employee={selectedEmployee} onSave={handleSaveEditEmployee} />
        <UserDetailsDialog open={viewUserOpen} onClose={handleCloseViewDialog} user={selectedUserForView} />
        <ConfirmationDialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)} onConfirm={handleConfirmDelete} title="تأكيد الحذف" message={`هل أنت متأكد أنك تريد حذف "${userToDelete?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`} />
    </Box>
    );
}