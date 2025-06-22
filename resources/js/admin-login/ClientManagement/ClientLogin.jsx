import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

// الألوان الرئيسية
const colors = {
  gold: '#D4AF37',
  darkGold: '#B4943C',
  black: '#1A1A1A',
  white: '#FFFFFF',
};

// زر مخصص
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '12px 0',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  background: colors.gold,
  color: colors.black,
  boxShadow: '0 4px 18px rgba(212, 175, 55, 0.10)',
  transition: 'all 0.3s',
  '&:hover': {
    background: colors.darkGold,
    color: colors.white,
  },
}));

const CreateAccountButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: '10px 0',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: colors.gold,
  border: `2px solid ${colors.gold}`,
  background: 'transparent',
  marginTop: theme.spacing(2),
  transition: 'all 0.3s',
  '&:hover': {
    background: colors.gold,
    color: colors.black,
    borderColor: colors.darkGold,
  },
}));

export default function ClientLogin({ setIsLoggedIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "client@test.com" && password === "123456") {
      setIsLoggedIn && setIsLoggedIn(true);
      navigate('/client-management');
    } else {
      alert("البريد أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.black} 0%, #232323 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* زخرفة ذهبية */}
      <Box sx={{ position: 'absolute', left: 0, top: 0, width: 120, height: 120, zIndex: 0, opacity: 0.13, background: `radial-gradient(circle at 40% 40%, ${colors.gold} 0%, transparent 70%)` }} />
      <Box sx={{ position: 'absolute', right: 0, bottom: 0, width: 180, height: 180, zIndex: 0, opacity: 0.10, background: `radial-gradient(circle at 60% 60%, ${colors.gold} 0%, transparent 80%)` }} />

      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          maxWidth: 380,
          width: '100%',
          textAlign: 'center',
          zIndex: 1,
          background: colors.white,
        }}
      >
        {/* رسالة ترحيبية */}
        <Typography sx={{ color: colors.gold, fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}>
          أهلاً بك في بوابة العملاء، يرجى تسجيل الدخول للمتابعة.
        </Typography>
        {/* العنوان */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.black, mb: 2 }}>
          تسجيل الدخول للعميل
        </Typography>
        {/* نموذج تسجيل الدخول */}
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="البريد الإلكتروني أو اسم المستخدم"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            dir="rtl"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            label="كلمة المرور"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            sx={{ mb: 2 }}
            dir="rtl"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="إظهار/إخفاء كلمة المرور"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <StyledButton variant="contained" fullWidth onClick={handleLogin}>
            تسجيل الدخول
          </StyledButton>
        </Box>
        {/* رابط إنشاء حساب جديد */}
        <Typography sx={{ mt: 3, color: colors.black, fontWeight: 500 }}>
          ليس لديك حساب؟
        </Typography>
        <CreateAccountButton fullWidth>
          إنشاء حساب جديد
        </CreateAccountButton>
      </Paper>
    </Box>
  );
}