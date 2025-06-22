import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
// تم حذف استيراد أيقونة LinkedIn من هنا

// الألوان الرئيسية
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

const TeamWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${colors.black} 0%, ${colors.lightBlack} 100%)`,
  color: colors.white,
  padding: theme.spacing(10, 2),
  minHeight: 'calc(100vh - 64px)',
}));

const MemberCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: colors.white,
  borderRadius: '16px',
  border: '1px solid rgba(212, 175, 55, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
  },
}));

const MemberAvatar = styled(Avatar)(({ theme }) => ({
  width: 140,
  height: 140,
  border: `4px solid ${colors.gold}`,
  marginBottom: theme.spacing(3),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export default function Team() {
  const teamMembers = [
    {
      img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop',
      name: 'أ. سهيل المرزوقي',
      title: 'المؤسس والرئيس التنفيذي',
      description: 'محامٍ بخبرة تمتد لعقدين في القانون التجاري والشركات، متخصص في صياغة الاستراتيجيات القانونية للشركات الكبرى والناشئة.',
    },
    {
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
      name: 'أ. نورة الحربي',
      title: 'شريك - رئيس قسم التقاضي',
      description: 'محامية متمرسة في التقاضي أمام جميع المحاكم، تتمتع بسجل حافل بالنجاح في القضايا المدنية والتجارية المعقدة.',
    },
    {
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
      name: 'أ. محمد بن عفيف',
      title: 'شريك - رئيس قسم الشركات',
      description: 'متخصص في عمليات الدمج والاستحواذ وتمويل الشركات، يقدم استشاراته لكبرى المؤسسات المالية والاستثمارية في المنطقة.',
    },
    {
      img: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
      name: 'أ. تركي الجحدلي',
      title: 'مستشار قانوني أول',
      description: 'خبير في القانون العقاري والإنشاءات، يتمتع بفهم عميق للأنظمة واللوائح العقارية، ويقدم حلولاً مبتكرة للنزاعات.',
    },
  ];

  return (
    <TeamWrapper>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: colors.white, fontFamily: 'Cairo, sans-serif', mb: 2 }}>
            فريق العمل الأساسي
          </Typography>
          <Typography variant="h6" sx={{ color: colors.gold, fontWeight: 500, maxWidth: '800px', mx: 'auto', lineHeight: 1.7, fontFamily: 'Cairo, sans-serif' }}>
            أبرز عقولنا القانونية التي تكرس خبراتها لخدمة عملائنا وتحقيق أهدافهم بكفاءة واحترافية.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MemberCard>
                <MemberAvatar src={member.img} alt={member.name} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>
                  {member.name}
                </Typography>
                <Typography sx={{ color: colors.gold, my: 1, fontFamily: 'Cairo, sans-serif', fontWeight: 'bold' }}>
                  {member.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', my: 2, flexGrow: 1, fontFamily: 'Cairo, sans-serif' }}>
                  {member.description}
                </Typography>
                {/* تم حذف أيقونة LinkedIn من هنا */}
              </MemberCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </TeamWrapper>
  );
}