import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography, Avatar, styled, alpha } from '@mui/material';
import EmployeeSidebar from './EmployeeSidebar'; // استيراد الشريط الجانبي الجديد
import BusinessIcon from '@mui/icons-material/Business';

const colors = {
  primary: '#3f51b5',
  background: '#FFFFFF',
  backgroundSubtle: '#F4F6F8',
  textPrimary: '#263238',
  textSecondary: '#546e7a',
};

const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex', alignItems: 'center', padding: theme.spacing(3, 4),
  borderBottom: `1px solid ${alpha(colors.textPrimary, 0.1)}`, backgroundColor: colors.background,
}));

export default function EmployeeLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <EmployeeSidebar />
      <Box component="div" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: 'calc(100% - 280px)' }}>
        <PageHeader>
          <Avatar sx={{ bgcolor: colors.primary, width: 56, height: 56, ml: 2 }}>
            <BusinessIcon sx={{ fontSize: 32, color: colors.background }} />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, color: colors.textPrimary }}>
              نظام أتمتة أعمال مكتب المحاماة
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Cairo, sans-serif', color: colors.textSecondary }}>
              قسم الموظفين
            </Typography>
          </Box>
        </PageHeader>
        <Box component="main" sx={{ flexGrow: 1, p: 4, background: colors.backgroundSubtle, overflowY: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}