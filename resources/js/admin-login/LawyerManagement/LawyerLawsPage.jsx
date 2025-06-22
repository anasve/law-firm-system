import React from "react";
import { Box, Typography, Card, Avatar } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import InsightsIcon from '@mui/icons-material/Insights'; // أيقونة بديلة مناسبة
import LawyerSidebar from "./LawyerSidebar"; // تأكد من أن المسار صحيح

// --- نظام الألوان الأزرق الاحترافي ---
const colors = {
  primary: '#3f51b5',
  background: '#FFFFFF',
  backgroundSubtle: '#F4F6F8',
  textPrimary: '#263238',
  textSecondary: '#546e7a',
};

// --- المكونات المصممة ---
const LawsPageContainer = styled(Box)({
    flex: 1,
    backgroundColor: colors.backgroundSubtle,
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
    padding: '32px',
});

const LawsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${alpha(colors.textPrimary, 0.1)}`,
}));

const WelcomeBox = styled(Card)(({ theme }) => ({
    background: colors.background,
    borderRadius: "16px",
    boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
    padding: theme.spacing(6, 5),
    maxWidth: 700,
    width: '100%',
    textAlign: "center",
}));

const Footer = styled(Box)(({ theme }) => ({
    marginTop: 'auto',
    paddingTop: theme.spacing(4),
    textAlign: 'center',
    color: colors.textSecondary,
    fontFamily: 'Cairo, sans-serif',
    fontSize: '0.875rem',
}));

// --- المكون الرئيسي ---
export default function LawyerLawsPage() {
  return (
    <div style={{ display: "flex" }}>
      <LawyerSidebar />
      <LawsPageContainer>
        <LawsHeader>
          {/* تم تقليل الهامش هنا ليطابق الصورة */}
          <Avatar sx={{ bgcolor: colors.primary, width: 56, height: 56, ml: 2 }}>
            <InsightsIcon sx={{ fontSize: 32, color: colors.background }} />
          </Avatar>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 700,
                color: colors.textPrimary,
                lineHeight: 1.3,
              }}
            >
              نظام أتمتة أعمال مكتب المحاماة
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Cairo, sans-serif',
                color: colors.textSecondary,
              }}
            >
              صفحة القوانين والتشريعات
            </Typography>
          </Box>
        </LawsHeader>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <WelcomeBox>
            <Typography variant="h4" component="h1" sx={{ color: colors.primary, marginBottom: 3, fontFamily: 'Cairo, sans-serif', fontWeight: 'bold' }}>
              مرحباً بك في نظام المحامي برو!
            </Typography>
            <Typography variant="h6" sx={{ color: colors.textSecondary, fontFamily: 'Cairo, sans-serif', fontWeight: 400, lineHeight: 1.6, mb: 1 }}>
              يسعدنا وجودك معنا في منصة أتمتة أعمال مكتب المحاماة.
            </Typography>
            <Typography variant="body1" sx={{ color: colors.textSecondary, fontFamily: 'Cairo, sans-serif', lineHeight: 1.7, mt: 3 }}>
              يمكنك من خلال هذه المنصة إدارة أعمالك القانونية بكل سهولة واحترافية.
              نتمنى لك يوماً موفقاً في عملك القانوني!
            </Typography>
            <div style={{ marginTop: 40, color: colors.primary, fontWeight: "bold", fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem' }}>
              فريق المحامي برو
            </div>
          </WelcomeBox>
        </Box>

        <Footer>
          <span>© {new Date().getFullYear()} نظام أتمتة أعمال مكتب المحاماة - جميع الحقوق محفوظة</span>
        </Footer>
      </LawsPageContainer>
    </div>
  );
}