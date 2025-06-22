import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

// الألوان الرئيسية
const colors = {
  gold: '#D4AF37',
  darkGold: '#B4943C',
  black: '#1A1A1A',
  white: '#FFFFFF',
  gray: '#F7F7F7',
};

// قسم الثقة
const TrustSection = styled(Box)(({ theme }) => ({
  background: colors.white,
  borderRadius: '18px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
  padding: '48px 16px',
  margin: '60px auto 0 auto',
  maxWidth: '1100px',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
}));

// بطاقة ميزة
const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: '2rem 1.5rem',
  textAlign: 'center',
  background: 'rgba(255,255,255,0.97)',
  borderRadius: '15px',
  boxShadow: '0 4px 18px rgba(212, 175, 55, 0.10)',
  transition: 'all 0.3s',
  border: `1.5px solid ${colors.gold}`,
  '&:hover': {
    transform: 'translateY(-6px) scale(1.03)',
    boxShadow: '0 8px 30px rgba(212, 175, 55, 0.18)',
    borderColor: colors.darkGold,
  },
}));

// لاحظ أن isLoggedIn لم نعد بحاجة لها هنا
export default function ClientManagement() {
  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(135deg, ${colors.black} 0%, #232323 100%)`, position: 'relative', overflow: 'hidden' }}>
      {/* تم حذف الهيدر من هنا */}

      {/* القسم الرئيسي */}
      <Box sx={{ position: 'relative', pt: { xs: 10, md: 16 }, pb: { xs: 8, md: 10 }, textAlign: 'center', zIndex: 1 }}>
        {/* خلفية شفافة */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.04) 100%)',
          zIndex: 0,
        }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ color: colors.white, fontWeight: 'bold', fontSize: { xs: '2.2rem', md: '3.5rem' }, mb: 2, fontFamily: 'Cairo, sans-serif', letterSpacing: 1 }}>
            الحلول القانونية لعالم اليوم
          </Typography>
          <Typography variant="h5" sx={{ color: colors.gold, mb: 3, fontWeight: 500, fontSize: { xs: '1.1rem', md: '1.5rem' } }}>
            Legal solutions for today's world
          </Typography>
        </Container>

        {/* قسم المميزات */}
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard elevation={0}>
                <GavelIcon sx={{ fontSize: 48, color: colors.gold, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.black, fontWeight: 'bold', mb: 1 }}>
                  استشارات قانونية متخصصة
                </Typography>
                <Typography sx={{ color: colors.black, opacity: 0.8 }}>
                  فريق من المحامين ذوي الخبرة لتقديم أفضل الحلول القانونية لمكتبك وعملائك.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard elevation={0}>
                <SecurityIcon sx={{ fontSize: 48, color: colors.gold, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.black, fontWeight: 'bold', mb: 1 }}>
                  حماية وسرية البيانات
                </Typography>
                <Typography sx={{ color: colors.black, opacity: 0.8 }}>
                  أعلى معايير الأمان والخصوصية لحماية معلوماتك وملفات عملائك.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureCard elevation={0}>
                <EmojiObjectsIcon sx={{ fontSize: 48, color: colors.gold, mb: 2 }} />
                <Typography variant="h6" sx={{ color: colors.black, fontWeight: 'bold', mb: 1 }}>
                  حلول ذكية وابتكارية
                </Typography>
                <Typography sx={{ color: colors.black, opacity: 0.8 }}>
                  نظام متكامل لإدارة القضايا، الجلسات، العملاء، والفواتير بذكاء وسهولة.
                </Typography>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* قسم الثقة */}
      <TrustSection>
        <Typography variant="h4" sx={{ color: colors.gold, fontWeight: 'bold', mb: 2, fontFamily: 'Cairo, sans-serif' }}>
          قد الثقة!
        </Typography>
        <Typography variant="h6" sx={{ color: colors.black, opacity: 0.85, fontWeight: 500, maxWidth: '900px', mx: 'auto', lineHeight: 2 }}>
          مكتب محامي برو حصل على العديد من الاعتمادات العالمية وذلك يعود لاهتمامها الدائم بجميع معايير الجودة وتقديم أفضل تجربة ممكنة لعملائها الكرام
        </Typography>
      </TrustSection>

      {/* زخارف ذهبية */}
      <Box sx={{ position: 'absolute', left: 0, top: 0, width: 120, height: 120, zIndex: 0, opacity: 0.13, background: `radial-gradient(circle at 40% 40%, ${colors.gold} 0%, transparent 70%)` }} />
      <Box sx={{ position: 'absolute', right: 0, bottom: 0, width: 180, height: 180, zIndex: 0, opacity: 0.10, background: `radial-gradient(circle at 60% 60%, ${colors.gold} 0%, transparent 80%)` }} />
    </Box>
  );
}