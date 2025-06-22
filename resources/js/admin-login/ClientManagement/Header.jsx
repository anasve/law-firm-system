import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Button, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, Link } from 'react-router-dom';

// الألوان الرئيسية
const colors = {
  gold: '#D4AF37',
  darkGold: '#B4943C',
  black: '#1A1A1A',
  white: '#FFFFFF',
};

// الهيدر
const StyledAppBar = styled(AppBar)({
  background: colors.black,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  padding: '0',
});

const NavLink = styled(Link)({
  color: colors.white,
  margin: '0 18px',
  fontWeight: 'bold',
  fontSize: '1.08rem',
  textDecoration: 'none',
  transition: 'color 0.2s',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    color: colors.gold,
  },
});

const DropdownNavLink = styled(Box)({
  color: colors.white,
  margin: '0 18px',
  fontWeight: 'bold',
  fontSize: '1.08rem',
  textDecoration: 'none',
  transition: 'color 0.2s',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    color: colors.gold,
  },
});

const StyledMenuItem = styled(MenuItem)({
    fontFamily: 'Cairo, sans-serif',
    '&:hover': {
        backgroundColor: colors.gold,
        color: colors.black,
    },
});


export default function Header({ isLoggedIn }) {
  const navigate = useNavigate();
  
  // State للقائمة الأولى (الممارسات)
  const [anchorElPractices, setAnchorElPractices] = useState(null);
  const openPractices = Boolean(anchorElPractices);

  // State للقائمة الثانية (المزيد)
  const [anchorElMore, setAnchorElMore] = useState(null);
  const openMore = Boolean(anchorElMore);

  const handleMenuOpen = (event, menuSetter) => {
    menuSetter(event.currentTarget);
  };

  const handleMenuClose = (menuSetter) => {
    menuSetter(null);
  };

  return (
    <StyledAppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, md: 6 } }}>
        <Box component={Link} to="/client-management" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
            <Box sx={{ width: 38, height: 38, bgcolor: colors.gold, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                <Typography variant="h5" sx={{ color: colors.black, fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>م</Typography>
            </Box>
            <Typography variant="h6" sx={{ color: colors.gold, fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', letterSpacing: 1 }}>
                محامي برو
            </Typography>
        </Box>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <NavLink to="/client-management">الرئيسية</NavLink>
          <NavLink to="/about-office">نبذة عن المكتب</NavLink>
          <NavLink to="/why-us">لماذا نحن؟</NavLink>
          
          <Box onMouseLeave={() => handleMenuClose(setAnchorElPractices)}>
            <DropdownNavLink onMouseEnter={(e) => handleMenuOpen(e, setAnchorElPractices)}>
              الممارسات <ArrowDropDownIcon />
            </DropdownNavLink>
            <Menu
              anchorEl={anchorElPractices}
              open={openPractices}
              onClose={() => handleMenuClose(setAnchorElPractices)}
              MenuListProps={{ onMouseLeave: () => handleMenuClose(setAnchorElPractices) }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              sx={{ '& .MuiPaper-root': { backgroundColor: colors.black, borderRadius: '8px', border: `1px solid ${colors.darkGold}` } }}
            >
              <StyledMenuItem component={Link} to="/services" onClick={() => handleMenuClose(setAnchorElPractices)}>الخدمات</StyledMenuItem>
              <StyledMenuItem component={Link} to="/fields" onClick={() => handleMenuClose(setAnchorElPractices)}>المجالات</StyledMenuItem>
            </Menu>
          </Box>
          
          <NavLink to="/blog">المدونة</NavLink>

          {/* --- قائمة "المزيد" الجديدة --- */}
          <Box onMouseLeave={() => handleMenuClose(setAnchorElMore)}>
            <DropdownNavLink onMouseEnter={(e) => handleMenuOpen(e, setAnchorElMore)}>
              المزيد <ArrowDropDownIcon />
            </DropdownNavLink>
            <Menu
              anchorEl={anchorElMore}
              open={openMore}
              onClose={() => handleMenuClose(setAnchorElMore)}
              MenuListProps={{ onMouseLeave: () => handleMenuClose(setAnchorElMore) }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{ '& .MuiPaper-root': { backgroundColor: colors.black, borderRadius: '8px', border: `1px solid ${colors.darkGold}` } }}
            >
              <StyledMenuItem component={Link} to="/team" onClick={() => handleMenuClose(setAnchorElMore)}>فريق العمل الأساسي</StyledMenuItem>
              <StyledMenuItem component={Link} to="/careers" onClick={() => handleMenuClose(setAnchorElMore)}>التوظيف</StyledMenuItem>
              
              {/* عناصر تظهر فقط عند تسجيل الدخول */}
              {isLoggedIn && [
                <StyledMenuItem key="consultation" component={Link} to="/request-consultation" onClick={() => handleMenuClose(setAnchorElMore)}>
                    طلب استشارة قانونية
                </StyledMenuItem>,
                <StyledMenuItem key="quote" component={Link} to="/request-quote" onClick={() => handleMenuClose(setAnchorElMore)}>
                    طلب عرض مالي
                </StyledMenuItem>
              ]}
            </Menu>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* ... الأيقونات وأزرار تسجيل الدخول تبقى كما هي ... */}
          <IconButton color="inherit"><NotificationsIcon /></IconButton>
          <IconButton color="inherit" onClick={() => navigate('/login')}><PersonIcon /></IconButton>
          <IconButton color="inherit"><PhoneIcon /></IconButton>
          <IconButton color="inherit" sx={{ display: { xs: 'flex', md: 'none' } }}><MenuIcon /></IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}