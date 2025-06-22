import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import GavelIcon from '@mui/icons-material/Gavel';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

// استخدام نفس الألوان للحفاظ على هوية بصرية موحدة
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

const ServicesWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${colors.black} 0%, ${colors.lightBlack} 100%)`,
  color: colors.white,
  padding: theme.spacing(10, 2),
  minHeight: 'calc(100vh - 64px)',
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

export default function Services() {
  const services = [
    {
      icon: <QuestionAnswerOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'الاستشارات القانونية',
      description: 'نقدم استشارات دقيقة وشاملة لمساعدتك على فهم موقفك القانوني واتخاذ قرارات مستنيرة في جميع القضايا.',
    },
    {
      icon: <GavelIcon sx={{ fontSize: 'inherit' }} />,
      title: 'التقاضي والتمثيل أمام المحاكم',
      description: 'فريق من المحامين المتمرسين للدفاع عن حقوقك وتمثيلك بكفاءة أمام جميع أنواع المحاكم واللجان القضائية.',
    },
    {
      icon: <ArticleOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'صياغة ومراجعة العقود',
      description: 'صياغة ومراجعة كافة أنواع العقود التجارية والمدنية لضمان حماية مصالحك وتجنب النزاعات المستقبلية.',
    },
    {
      icon: <BusinessOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'تأسيس الشركات وحوكمتها',
      description: 'نساعدك في جميع إجراءات تأسيس الشركات وتعديلها، وتقديم حلول الحوكمة لضمان الامتثال والاستدامة.',
    },
    {
      icon: <HomeWorkOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'القضايا العقارية',
      description: 'خبرة واسعة في نزاعات الملكية، عقود الإيجار، عمليات البيع والشراء، وكل ما يتعلق بالقانون العقاري.',
    },
    {
      icon: <LightbulbOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'حماية الملكية الفكرية',
      description: 'تسجيل العلامات التجارية وبراءات الاختراع وحقوق المؤلف، وحمايتها من التعدي لضمان حقوقك الإبداعية.',
    },
  ];

  return (
    <ServicesWrapper>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: colors.white, fontFamily: 'Cairo, sans-serif', mb: 2 }}>
            خدماتنا القانونية
          </Typography>
          <Typography variant="h6" sx={{ color: colors.gold, fontWeight: 500, maxWidth: '800px', mx: 'auto', lineHeight: 1.7, fontFamily: 'Cairo, sans-serif' }}>
            نقدم مجموعة متكاملة من الخدمات القانونية التي تلبي احتياجات الأفراد والشركات، مع التركيز على الجودة والنتائج.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard>
                <IconWrapper>{service.icon}</IconWrapper>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Cairo, sans-serif' }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Cairo, sans-serif', lineHeight: 1.8 }}>
                  {service.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ServicesWrapper>
  );
}