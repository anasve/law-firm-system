import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
// --- أيقونات جديدة ---
import FamilyRestroomOutlinedIcon from '@mui/icons-material/FamilyRestroomOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';


// الألوان الرئيسية
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

const FieldsWrapper = styled(Box)(({ theme }) => ({
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

export default function Fields() {
  const fields = [
    {
      icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'قانون الشركات والتجارة',
      description: 'خبرة في تأسيس الشركات، وعمليات الدمج والاستحواذ، وصياغة الاتفاقيات التجارية، وتقديم الاستشارات لضمان امتثال الشركات للقوانين.',
    },
    {
      icon: <LocationCityOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'القانون العقاري والإنشاءات',
      description: 'نقدم الدعم الكامل في كافة المعاملات العقارية، من البيع والشراء إلى تطوير المشاريع والتمويل العقاري، وحل النزاعات المتعلقة بالملكية.',
    },
    {
      icon: <GavelOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'التقاضي والتحكيم',
      description: 'نمثل عملائنا بقوة في جميع مراحل التقاضي أمام المحاكم، ونسعى لحل النزاعات بكفاءة من خلال التحكيم والوسائل البديلة لتحقيق العدالة.',
    },
    {
      icon: <WorkOutlineOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'قانون العمل والعمال',
      description: 'استشارات شاملة حول عقود العمل، سياسات الشركات، وإنهاء الخدمات. نمثل الموظفين وأصحاب العمل في النزاعات العمالية.',
    },
    {
      icon: <LightbulbOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'الملكية الفكرية والتكنولوجيا',
      description: 'حماية أصولك غير الملموسة هي أولويتنا. نعمل على تسجيل وحماية العلامات التجارية، براءات الاختراع، وحقوق النشر.',
    },
    {
      icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'القانون المصرفي والتمويل',
      description: 'نقدم استشارات متعمقة للبنوك والمؤسسات المالية والشركات في مجالات التمويل، إعادة الهيكلة، والامتثال التنظيمي للمعاملات المالية.',
    },
    // --- المجالات الجديدة ---
    {
      icon: <FamilyRestroomOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'قانون الأحوال الشخصية',
      description: 'نتعامل مع قضايا الزواج، الطلاق، الحضانة، والتركات بحساسية وسرية تامة، مع السعي لتحقيق أفضل الحلول التي تحفظ حقوق ومصالح الأسرة.',
    },
    {
      icon: <LocalPoliceOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'القانون الجنائي',
      description: 'نوفر الدفاع القانوني القوي في جميع مراحل الدعوى الجنائية، من التحقيقات الأولية إلى المحاكمة والاستئناف، لضمان محاكمة عادلة.',
    },
    {
      icon: <AssuredWorkloadOutlinedIcon sx={{ fontSize: 'inherit' }} />,
      title: 'القانون الإداري والعقود الحكومية',
      description: 'نمثل الأفراد والشركات في المنازعات ضد الجهات الحكومية، ونتخصص في عقود المناقصات والمشتريات الحكومية، لضمان الشفافية.',
    },
  ];

  return (
    <FieldsWrapper>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: colors.white, fontFamily: 'Cairo, sans-serif', mb: 2 }}>
            مجالات خبرتنا
          </Typography>
          <Typography variant="h6" sx={{ color: colors.gold, fontWeight: 500, maxWidth: '800px', mx: 'auto', lineHeight: 1.7, fontFamily: 'Cairo, sans-serif' }}>
            نغطي مجموعة واسعة من المجالات القانونية، ونقدم خبرات متخصصة تضمن لعملائنا أفضل النتائج الممكنة في قضاياهم المتنوعة.
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard>
                <IconWrapper>{field.icon}</IconWrapper>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Cairo, sans-serif' }}>
                  {field.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Cairo, sans-serif', lineHeight: 1.8 }}>
                  {field.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </FieldsWrapper>
  );
}