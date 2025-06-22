import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

// استخدام نفس الألوان للحفاظ على هوية بصرية موحدة
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

const WhyUsWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${colors.black} 0%, ${colors.lightBlack} 100%)`,
  color: colors.white,
  padding: theme.spacing(10, 2),
  minHeight: 'calc(100vh - 64px)', // لحساب ارتفاع الهيدر
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: colors.white,
  borderRadius: '16px',
  border: '1px solid rgba(212, 175, 55, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
    borderColor: colors.gold,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: colors.gold,
  fontSize: '4rem',
}));

export default function WhyUs() {
  const features = [
    {
      icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'إدارة إلكترونية متكاملة',
      description: 'نظام متطور لإدارة القضايا والجلسات والفواتير، يضمن لك الشفافية وسهولة المتابعة في أي وقت ومن أي مكان.',
    },
    {
      icon: <LanguageOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'خبرة محلية بمعايير عالمية',
      description: 'فريقنا يجمع بين الفهم العميق للأنظمة القانونية المحلية وأفضل الممارسات العالمية لتقديم حلول قانونية مبتكرة وفعالة.',
    },
    {
      icon: <AutoStoriesOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'تقارير تلقائية ودورية',
      description: 'ابقَ على اطلاع دائم بآخر مستجدات قضاياك من خلال تقارير مفصلة وتلقائية تصلك بانتظام، مما يوفر عليك الوقت والجهد.',
    },
  ];

  return (
    <WhyUsWrapper>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: colors.white, fontFamily: 'Cairo, sans-serif', mb: 2 }}>
            لماذا تختار محامي برو؟
          </Typography>
          <Typography variant="h6" sx={{ color: colors.gold, fontWeight: 500, maxWidth: '800px', mx: 'auto', lineHeight: 1.7, fontFamily: 'Cairo, sans-serif' }}>
            نقدم خدمات قانونية متميزة مع التزامنا بالنزاهة والاحترافية، وفريق من الخبراء لضمان رضا العملاء وتحقيق أهدافهم القانونية بكفاءة عالية.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <IconWrapper>{feature.icon}</IconWrapper>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Cairo, sans-serif' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Cairo, sans-serif', lineHeight: 1.8 }}>
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </WhyUsWrapper>
  );
}