import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// تم إضافة Grid هنا لحل المشكلة
import { Box, Typography, Grid, Paper, TextField, Button, Chip, Divider, Avatar } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Icons
import Send from '@mui/icons-material/Send';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// --- نظام الألوان المعتمد ---
const colors = {
  gold: '#D4AF37',
  black: '#141414', // Main background
  lightBlack: '#232323', // Card background
  white: '#FFFFFF',
  textSecondary: alpha('#FFFFFF', 0.7),
  // Colors for action buttons from the image
  action: {
    pendingBg: '#fde68a', pendingColor: '#b45309',
    processingBg: '#dbeafe', processingColor: '#2563eb',
    resolvedBg: '#bbf7d0', resolvedColor: '#166534',
    rejectedBg: '#fecaca', rejectedColor: '#b91c1c',
  }
};

// --- البيانات التجريبية ---
const complaintData = {
  2: {
    id: 2,
    lawyer: "أحمد محمد",
    submitter: "سامي عبدالله",
    type: "سوء سلوك مهني",
    date: "1445/03/30 هـ",
    phone: "0555123456",
    status: "قيد الانتظار",
    details: "لم يلتزم المحامي بالحضور في جلسات المحكمة المتفق عليها، مما أدى إلى تأخير القضية وإلحاق الضرر بمصالحي.",
    comments: [
      { user: "النظام", text: "تم استلام الشكوى وجاري مراجعتها.", date: "1445/03/30 هـ" },
    ],
  },
};

// --- المكونات المصممة ---
const SectionCard = styled(Paper)(({ theme }) => ({
    backgroundColor: colors.lightBlack,
    padding: theme.spacing(3),
    borderRadius: '16px',
    marginBottom: theme.spacing(3),
    border: `1px solid ${alpha(colors.white, 0.1)}`
}));

const ActionButton = styled(Button)(({ theme, bgcolor, color }) => ({
    backgroundColor: bgcolor,
    color: color,
    fontWeight: 'bold',
    borderRadius: '8px',
    margin: theme.spacing(0.5),
    padding: '8px 16px',
    fontFamily: 'Cairo, sans-serif',
    flex: 1,
    '& .MuiButton-startIcon': {
        marginRight: -4,
        marginLeft: 4
    }
}));

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        color: colors.textSecondary,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        '&.Mui-focused': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: alpha(colors.white, 0.2) },
        '&:hover fieldset': { borderColor: colors.gold },
        '&.Mui-focused fieldset': { borderColor: colors.gold },
    },
    '& label': {
        color: colors.textSecondary,
        fontFamily: 'Cairo, sans-serif',
    },
    '& label.Mui-focused': {
        color: colors.gold,
    },
});

export default function ComplaintDetails() {
  const { id } = useParams();
  const complaint = complaintData[id];
  const [newComment, setNewComment] = useState('');

  if (!complaint) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">الشكوى غير موجودة</Typography>
      </Box>
    );
  }

  const InfoText = ({ children }) => (
    <Typography component="span" sx={{ color: colors.textSecondary, fontFamily: 'Cairo, sans-serif' }}>
      {children}
    </Typography>
  );

  const ValueText = ({ children }) => (
    <Typography component="span" sx={{ color: colors.white, fontWeight: 'bold', mr: 2, fontFamily: 'Cairo, sans-serif' }}>
      {children}
    </Typography>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: colors.white, direction: 'rtl' }}>
      
      {/* --- Main Info Card --- */}
      <SectionCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
                <InfoText>اسم المحامي:</InfoText> <ValueText>{complaint.lawyer}</ValueText>
                <InfoText>مقدم الشكوى:</InfoText> <ValueText>{complaint.submitter}</ValueText>
                <InfoText>نوع الشكوى:</InfoText> <ValueText>{complaint.type}</ValueText>
                <InfoText>تاريخ التقديم:</InfoText> <ValueText>{complaint.date}</ValueText>
                <InfoText>معلومات الاتصال:</InfoText> <ValueText>{complaint.phone}</ValueText>
            </Box>
            <Chip label={complaint.status} sx={{ bgcolor: colors.gold, color: colors.black, fontWeight: 'bold', padding: '10px' }} />
        </Box>
      </SectionCard>
      
      {/* --- Details Card --- */}
      <SectionCard>
        <Typography variant="h6" sx={{ color: colors.gold, mb: 1.5, fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>تفاصيل الشكوى</Typography>
        <Divider sx={{ mb: 2, borderColor: alpha(colors.white, 0.1) }} />
        <Typography sx={{ color: colors.textSecondary, lineHeight: 1.8, fontFamily: 'Cairo, sans-serif' }}>{complaint.details}</Typography>
      </SectionCard>

      {/* --- Actions Card --- */}
      <SectionCard>
        <Typography variant="h6" sx={{ color: colors.gold, mb: 1.5, fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>الإجراءات</Typography>
        <Divider sx={{ mb: 2, borderColor: alpha(colors.white, 0.1) }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <ActionButton bgcolor={colors.action.pendingBg} color={colors.action.pendingColor} startIcon={<HourglassEmptyIcon />}>قيد الانتظار</ActionButton>
            <ActionButton bgcolor={colors.action.processingBg} color={colors.action.processingColor} startIcon={<LoopIcon />}>قيد المعالجة</ActionButton>
            <ActionButton bgcolor={colors.action.resolvedBg} color={colors.action.resolvedColor} startIcon={<CheckCircleOutlineIcon />}>تم الحل</ActionButton>
            <ActionButton bgcolor={colors.action.rejectedBg} color={colors.action.rejectedColor} startIcon={<CancelOutlinedIcon />}>رفض</ActionButton>
        </Box>
      </SectionCard>

      {/* --- Comments Section --- */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <SectionCard sx={{ height: '100%' }}>
                <Typography variant="h6" sx={{ color: colors.gold, mb: 1.5, fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>التعليقات والإجراءات السابقة</Typography>
                <Divider sx={{ mb: 2, borderColor: alpha(colors.white, 0.1) }} />
                {complaint.comments.map((comment, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Avatar sx={{ bgcolor: colors.gold, color: colors.black, width: 40, height: 40, ml: 2, fontWeight: 'bold' }}>{comment.user.charAt(0)}</Avatar>
                        <Box>
                            <Typography sx={{ fontWeight: 'bold', color: colors.white, fontFamily: 'Cairo, sans-serif' }}>{comment.user}</Typography>
                            <Typography sx={{ color: colors.textSecondary, fontSize: '0.9rem', fontFamily: 'Cairo, sans-serif' }}>{comment.text}</Typography>
                            <Typography sx={{ color: alpha(colors.white, 0.4), fontSize: '0.75rem' }}>{comment.date}</Typography>
                        </Box>
                    </Box>
                ))}
            </SectionCard>
        </Grid>
        <Grid item xs={12} md={6}>
            <SectionCard sx={{ height: '100%' }}>
                <Typography variant="h6" sx={{ color: colors.gold, mb: 1.5, fontWeight: 'bold', fontFamily: 'Cairo, sans-serif' }}>إضافة تعليق</Typography>
                <Divider sx={{ mb: 2, borderColor: alpha(colors.white, 0.1) }} />
                <StyledTextField label="أضف تعليقك هنا..." multiline rows={4} fullWidth value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <Button variant="contained" startIcon={<Send />} sx={{ mt: 2, width: '100%', backgroundColor: colors.gold, color: colors.black, fontWeight: 'bold', '&:hover': {backgroundColor: '#C4A484'} }}>
                    إرسال
                </Button>
            </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
}