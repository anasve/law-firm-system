import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import PieChartIcon from '@mui/icons-material/PieChart';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GavelIcon from '@mui/icons-material/Gavel';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportIcon from '@mui/icons-material/Report';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import ClassIcon from '@mui/icons-material/Class'; // تمت الإضافة
import { useNavigate, useLocation } from 'react-router-dom';

const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
  selectedBackground: '#2A2A2E', 
};

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px', margin: theme.spacing(1, 0), padding: theme.spacing(1.5, 2),
  transition: 'background-color 0.3s ease, color 0.3s ease', color: alpha(colors.white, 0.6),
  '& .MuiListItemIcon-root': { color: alpha(colors.white, 0.6), transition: 'color 0.3s ease', minWidth: '40px' },
  '&:hover': { backgroundColor: alpha(colors.gold, 0.1), color: colors.gold, '& .MuiListItemIcon-root': { color: colors.gold } },
  '&.Mui-selected': {
    backgroundColor: colors.selectedBackground, color: colors.white, fontWeight: 'bold',
    '& .MuiListItemIcon-root': { color: colors.white },
    '&:hover': { backgroundColor: colors.selectedBackground }
  }
}));

export default function GoldenSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'الرئيسية', icon: <PieChartIcon />, path: '/dashboard' },
    { text: 'إدارة المستخدمين', icon: <SupervisorAccountIcon />, path: '/lawyers' },
    { text: 'إدارة القوانين', icon: <GavelIcon />, path: '/laws-management' },
    { text: 'قائمة الاختصاصات', icon: <ClassIcon />, path: '/specializations' }, // تمت الإضافة هنا
    { text: 'عرض التفاصيل المالية', icon: <MonetizationOnIcon />, path: '/financial-details' },
    { text: 'عرض الشكاوى', icon: <ReportIcon />, path: '/complaints' },
    { text: 'عرض طلبات التوظيف', icon: <AssignmentIndIcon />, path: '/job-requests' },
    { text: 'تعديل الملف الشخصي', icon: <AccountCircleIcon />, path: '/profile-edit' },
  ];

  // --- تم تعديل هذه الدالة لإصلاح مشكلة التظليل ---
  const isPathActive = (path) => {
    // يجعل التظليل يعمل بشكل صحيح مع الصفحات الفرعية
    // يستثني المسار الرئيسي '/' لضمان عدم تظليله دائما
    if (path === '/') {
        return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Box sx={{ width: 280, minHeight: '100vh', background: colors.black, boxShadow: '2px 0 16px 0 rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', p: 2, flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: colors.gold, width: 48, height: 48, ml: 2 }}><SchoolIcon sx={{ fontSize: 30, color: colors.black }} /></Avatar>
        <Typography variant="h6" fontWeight="bold" color={colors.white} fontFamily="Cairo, sans-serif">المحامي برو</Typography>
      </Box>
      <List component="nav" sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <StyledListItemButton key={item.text} selected={isPathActive(item.path)} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif', fontWeight: 'medium' }} />
          </StyledListItemButton>
        ))}
      </List>
      
      {/* --- قسم تسجيل الخروج --- */}
      <Box>
        <Divider sx={{ my: 1, borderColor: alpha(colors.gold, 0.2) }} />
        <StyledListItemButton onClick={() => navigate('/')}> {/* يفترض أن '/' هي صفحة تسجيل الدخول */}
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="تسجيل الخروج" primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif', fontWeight: 'medium' }} />
        </StyledListItemButton>
      </Box>

      <Box sx={{ textAlign: 'center', py: 2, color: alpha(colors.white, 0.5), fontFamily: 'Cairo, sans-serif' }}>
        <Typography variant="caption">© {new Date().getFullYear()} جميع الحقوق محفوظة</Typography>
      </Box>
    </Box>
  );
}