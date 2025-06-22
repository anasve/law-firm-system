import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

// --- نظام الألوان المعتمد ---
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

// --- البيانات التجريبية ---
const complaints = [
  { id: 1, name: "خالد العمري", submitter: "فاطمة أحمد", type: "رسوم مبالغ فيها", date: "1445/03/25 هـ" },
  { id: 2, name: "أحمد محمد", submitter: "سامي عبدالله", type: "سوء سلوك مهني", date: "1445/03/30 هـ" },
  { id: 3, name: "محمد العلي", submitter: "نورة سعد", type: "تضارب المصالح", date: "1445/03/13 هـ" },
  { id: 4, name: "سارة الأحمد", submitter: "عمر خالد", type: "إهمال", date: "1445/03/10 هـ" },
];

// --- المكونات المصممة ---
const ComplaintListItem = styled(Paper)(({ theme }) => ({
  backgroundColor: colors.lightBlack,
  borderRadius: '12px',
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid transparent',
  transition: 'border-color 0.3s ease-in-out, background-color 0.3s ease-in-out',
  '&:hover': {
    borderColor: colors.gold,
    backgroundColor: alpha(colors.black, 0.4),
  }
}));

const DetailsButton = styled(Button)({
  backgroundColor: colors.gold,
  color: colors.black,
  fontFamily: 'Cairo, sans-serif',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  borderRadius: '8px',
  padding: '8px 18px',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: '#B4943C',
  },
  '& .MuiButton-startIcon': {
    marginRight: '-4px',
    marginLeft: '6px',
  }
});


export default function ComplaintsList() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: 'Cairo, sans-serif' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <ReportProblemOutlinedIcon sx={{ fontSize: 40, color: colors.gold, ml: 2 }} />
        <Typography variant="h4" fontWeight="bold" sx={{ color: colors.white }}>
          نظام إدارة الشكاوى
        </Typography>
      </Box>

      <Box>
        {complaints.map((complaint) => (
          <ComplaintListItem key={complaint.id}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: colors.white }}>
                  شكوى ضد: {complaint.name}
                </Typography>
                <Chip 
                  label={complaint.type} 
                  size="small"
                  sx={{ 
                    backgroundColor: alpha(colors.gold, 0.2), 
                    color: colors.gold, 
                    fontWeight: 'bold',
                    mr: 2 // margin-right for RTL
                  }} 
                />
              </Box>
              <Typography variant="body2" sx={{ color: alpha(colors.white, 0.6) }}>
                مقدم الشكوى: {complaint.submitter}  •  تاريخ التقديم: {complaint.date}
              </Typography>
            </Box>
            
            <DetailsButton
              startIcon={<VisibilityIcon fontSize="small" />}
              onClick={() => navigate(`/complaints/${complaint.id}`)}
            >
              عرض التفاصيل
            </DetailsButton>
          </ComplaintListItem>
        ))}
      </Box>
    </Box>
  );
}