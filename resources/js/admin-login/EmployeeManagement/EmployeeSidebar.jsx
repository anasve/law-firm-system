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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BadgeIcon from '@mui/icons-material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from "react-router-dom";

const colors = {
  primary: '#3f51b5',
  background: '#FFFFFF',
  textPrimary: '#263238',
  textSecondary: '#546e7a',
  selectedBackground: 'rgba(63, 81, 181, 0.08)',
};

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  margin: theme.spacing(0.75, 1.5),
  padding: theme.spacing(1.25, 2),
  color: colors.textSecondary,
  '&.Mui-selected': {
    backgroundColor: colors.selectedBackground,
    color: colors.primary,
    '& .MuiListItemText-primary': { fontWeight: 'bold' },
    '& .MuiListItemIcon-root': { color: colors.primary },
  }
}));

export default function EmployeeSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'إدارة المواعيد', icon: <EventAvailableIcon />, path: '/employee-appointments' },
  ];

  return (
    <Box sx={{ width: 280, minHeight: '100vh', background: colors.background, borderLeft: `1px solid ${alpha(colors.textPrimary, 0.1)}`, display: 'flex', flexDirection: 'column', p: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: colors.primary, width: 48, height: 48, ml: 2 }}>
          <BadgeIcon sx={{ color: colors.background }} />
        </Avatar>
        <Typography variant="h6" fontWeight="bold" color={colors.textPrimary} fontFamily="Cairo, sans-serif">
          بوابة الموظف
        </Typography>
      </Box>
      <List component="nav" sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <StyledListItemButton key={item.text} selected={location.pathname === item.path} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif' }} />
          </StyledListItemButton>
        ))}
      </List>
      <Box>
        <StyledListItemButton onClick={() => navigate('/')}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="تسجيل الخروج" primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif' }} />
        </StyledListItemButton>
      </Box>
    </Box>
  );
}