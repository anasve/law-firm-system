import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import GavelIcon from "@mui/icons-material/Gavel"; 
import EventNoteIcon from "@mui/icons-material/EventNote"; 
import ForumIcon from "@mui/icons-material/Forum";
import LockResetIcon from "@mui/icons-material/LockReset";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate, useLocation } from "react-router-dom";

// --- نظام الألوان الأزرق الاحترافي الجديد ---
const colors = {
  primary: '#3f51b5', // لون أزرق داكن (Indigo)
  background: '#FFFFFF',
  backgroundSubtle: '#F4F6F8', // خلفية ناعمة جدًا
  textPrimary: '#263238', // أسود غير حاد
  textSecondary: '#546e7a', // رمادي مزرق
  selectedBackground: 'rgba(63, 81, 181, 0.08)',
};

// --- تصميم زر القائمة بالأسلوب العصري ---
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  margin: theme.spacing(0.75, 1.5),
  padding: theme.spacing(1.25, 2),
  transition: 'background-color 0.2s ease, color 0.2s ease',
  color: colors.textSecondary,
  borderRight: '4px solid transparent', // تم تغيير جهة الخط لتناسب الواجهة العربية
  '& .MuiListItemIcon-root': {
    color: colors.textSecondary,
    transition: 'color 0.2s ease',
    minWidth: '45px',
  },
  '&:hover': {
    backgroundColor: colors.selectedBackground,
    color: colors.primary,
    '& .MuiListItemIcon-root': {
      color: colors.primary,
    },
  },
  '&.Mui-selected': {
    backgroundColor: colors.selectedBackground,
    color: colors.primary,
    borderRight: `4px solid ${colors.primary}`, // خط التمييز على اليمين
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
    },
    '& .MuiListItemIcon-root': {
      color: colors.primary,
    },
    '&:hover': {
      backgroundColor: colors.selectedBackground,
    }
  }
}));

export default function LawyerSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'عرض القوانين', icon: <GavelIcon />, path: '/laws-viewer' },
    { text: 'مراجعة المواعيد', icon: <EventNoteIcon />, path: '/lawyer-appointments' },
    { text: 'مراجعة الاستشارات', icon: <ForumIcon />, path: '/lawyer-consultations' },
    { text: 'تغيير كلمة المرور', icon: <LockResetIcon />, path: '/lawyer-change-password' },
  ];

  return (
    <Box
      sx={{
        width: 280,
        minHeight: '100vh',
        background: colors.background,
        borderLeft: `1px solid ${alpha(colors.textPrimary, 0.1)}`, // خط فاصل ناعم على اليسار
        display: 'flex',
        flexDirection: 'column',
        p: 1.5,
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
        <Avatar
          sx={{
            bgcolor: colors.primary,
            width: 48,
            height: 48,
            ml: 2,
          }}
        >
          <SchoolIcon sx={{ fontSize: 30, color: colors.white }} />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" color={colors.textPrimary} fontFamily="Cairo, sans-serif">
          بوابة المحامي
        </Typography>
      </Box>

      {/* القائمة */}
      <List component="nav" sx={{ flex: 1, p: 0 }}>
        {menuItems.map((item) => (
          <StyledListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif' }} 
            />
          </StyledListItemButton>
        ))}
      </List>
      
      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 2, color: colors.textSecondary, fontFamily: 'Cairo, sans-serif' }}>
        <Typography variant="caption">© {new Date().getFullYear()} جميع الحقوق محفوظة</Typography>
      </Box>
    </Box>
  );
}