import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Icons
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AddIcon from '@mui/icons-material/Add';

// Color Palette
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

// Styled Components
const WelcomeBanner = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  marginBottom: theme.spacing(4),
  borderRadius: '16px',
  background: `linear-gradient(145deg, ${colors.lightBlack} 30%, ${colors.black} 100%)`,
  borderLeft: `5px solid ${colors.gold}`,
  color: colors.white,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    background: `radial-gradient(circle, ${alpha(colors.gold, 0.1)} 0%, ${alpha(colors.gold, 0)} 70%)`,
  }
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '12px',
  backgroundColor: colors.lightBlack,
  color: colors.white,
  height: '100%',
}));

const ActionButton = styled(Button)({
  backgroundColor: colors.gold,
  color: colors.black,
  fontFamily: 'Cairo, sans-serif',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: '#B4943C',
  }
});

export default function AdminDashboardHome() {
  const navigate = useNavigate();

  // تم تحديث بيانات الإحصائيات حسب طلبك
  const stats = [
    { title: 'إجمالي المحامين', value: '12', icon: <PeopleAltOutlinedIcon sx={{ color: colors.black }} />, color: colors.gold },
    { title: 'إجمالي الموظفين', value: '8', icon: <Groups2OutlinedIcon sx={{ color: colors.black }} />, color: colors.gold },
  ];

  return (
    <Box>
      <WelcomeBanner elevation={5}>
        <Typography variant="h4" fontWeight="bold" fontFamily="Cairo, sans-serif">
          أهلاً بعودتك، مدير النظام
        </Typography>
        <Typography variant="subtitle1" sx={{ color: alpha(colors.white, 0.7), mt: 1 }} fontFamily="Cairo, sans-serif">
          نتمنى لك يوماً مثمراً. إليك نظرة سريعة على لوحة التحكم.
        </Typography>
      </WelcomeBanner>

      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}> {/* تم تعديل حجم الشبكة ليتناسب مع عدد البطاقات */}
            <StatCard elevation={3}>
              <Box>
                <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                <Typography sx={{ color: alpha(colors.white, 0.6) }}>{stat.title}</Typography>
              </Box>
              <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                {stat.icon}
              </Avatar>
            </StatCard>
          </Grid>
        ))}
      </Grid>
      
      <Paper sx={{ mt: 5, p: 3, borderRadius: '12px', backgroundColor: colors.lightBlack }}>
         <Typography variant="h6" fontWeight="bold" sx={{ color: colors.white, mb: 2 }}>إجراءات سريعة</Typography>
         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <ActionButton startIcon={<AddIcon />} onClick={() => navigate('/add-lawyer')}>إضافة محامي</ActionButton>
            <ActionButton startIcon={<AddIcon />} onClick={() => navigate('/add-employee')}>إضافة موظف</ActionButton>
         </Box>
      </Paper>
    </Box>
  );
}