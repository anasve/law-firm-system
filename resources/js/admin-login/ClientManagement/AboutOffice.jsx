import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import GavelIcon from '@mui/icons-material/Gavel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

// الألوان الرئيسية
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

const AboutWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${colors.black} 0%, ${colors.lightBlack} 100%)`,
  color: colors.white,
  padding: theme.spacing(10, 2),
  minHeight: 'calc(100vh - 64px)',
}));

const lawImage = "https://images.unsplash.com/photo-1589216532372-1c2a36790039?q=80&w=1974&auto=format&fit=crop";

const ImageBox = styled(Box)(({ theme }) => ({
    minHeight: '450px',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${lawImage})`,
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: alpha(colors.black, 0.5),
    }
}));

// --- التصميم الجديد لقسم القيم ---
const ValueItem = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(212, 175, 55, 0.2)',
  transition: 'all 0.3s ease',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(4),
  },
  '&:hover': {
    transform: 'scale(1.03)',
    borderColor: colors.gold,
    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
  },
}));


export default function AboutOffice() {
  const values = [
    {
      icon: <VisibilityIcon sx={{ fontSize: 50, color: colors.gold, mb: 2 }}/>,
      title: 'الشفافية والنزاهة',
      description: 'نعمل بأعلى المعايير الأخلاقية ونلتزم بالوضوح التام مع عملائنا في جميع مراحل العمل.'
    },
    {
      icon: <GavelIcon sx={{ fontSize: 50, color: colors.gold, mb: 2 }}/>,
      title: 'التميز والاحترافية',
      description: 'نسعى دائماً للكمال في خدماتنا، ونستثمر في تطوير مهارات فريقنا لنقدم الأفضل دائماً.'
    },
    {
      icon: <TrackChangesIcon sx={{ fontSize: 50, color: colors.gold, mb: 2 }}/>,
      title: 'العميل أولاً',
      description: 'نجاح عملائنا هو مقياس نجاحنا. نضع مصالحهم في المقام الأول ونسعى لتجاوز توقعاتهم.'
    }
  ];

  return (
    <AboutWrapper>
      <Container maxWidth="lg">
        {/* ... (الأقسام السابقة تبقى كما هي) ... */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', mb: 2 }}>
            عن مكتب محامي برو
          </Typography>
          <Typography variant="h6" sx={{ color: colors.gold, fontWeight: 500, maxWidth: '800px', mx: 'auto', lineHeight: 1.7, fontFamily: 'Cairo, sans-serif' }}>
            أساس متين من الخبرة والنزاهة، ورؤية طموحة للمستقبل القانوني.
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', color: colors.gold, mb: 3 }}>
                    من نحن
                </Typography>
                <Typography sx={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.9 }}>
                    مكتب محامي برو للمحاماة والاستشارات القانونية هو صرح قانوني رائد في دمشق، تأسس على مبادئ العدالة والاحترافية. نحن لا نقدم خدمات قانونية فحسب، بل نبني شراكات استراتيجية مع عملائنا، ونضع نجاحهم في صميم كل ما نقوم به.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <ImageBox />
            </Grid>
        </Grid>

        <Box sx={{ my: 10 }}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', color: colors.gold, mb: 2 }}>
                        رؤيتنا
                    </Typography>
                    <Typography sx={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.9 }}>
                        أن نكون المكتب القانوني الأكثر ثقة وابتكاراً في سوريا، وأن نصبح الخيار الأول للشركات والأفراد الذين يبحثون عن استشارات وخدمات قانونية لا تضاهى.
                    </Typography>
                </Grid>
                 <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', color: colors.gold, mb: 2 }}>
                        رسالتنا
                    </Typography>
                    <Typography sx={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.9 }}>
                        تقديم خدمات قانونية استثنائية قائمة على فهم عميق لاحتياجات عملائنا. نلتزم بالنزاهة المطلقة، ونسعى لتحقيق العدالة بكفاءة وفعالية.
                    </Typography>
                </Grid>
            </Grid>
        </Box>

        {/* --- قسم قيمنا بالتصميم الجديد --- */}
        <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', mb: 6 }}>
                قيمنا الأساسية
            </Typography>
            <Box sx={{ maxWidth: '700px', mx: 'auto' }}>
              {values.map((value, index) => (
                <ValueItem key={index}>
                    {value.icon}
                    <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', mb: 1 }}>
                        {value.title}
                    </Typography>
                    <Typography sx={{fontFamily: 'Cairo, sans-serif', opacity: 0.8}}>
                        {value.description}
                    </Typography>
                </ValueItem>
              ))}
            </Box>
        </Box>

      </Container>
    </AboutWrapper>
  );
}