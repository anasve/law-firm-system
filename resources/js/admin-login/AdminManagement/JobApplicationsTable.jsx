import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Avatar, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

// --- نظام الألوان المعتمد ---
const colors = {
  gold: '#D4AF37',
  black: '#141414',
  lightBlack: '#232323',
  white: '#FFFFFF',
  textSecondary: alpha('#FFFFFF', 0.7),
};

// --- البيانات التجريبية ---
const applications = [
  { id: 1, name: "أحمد محمد العلي", email: "ahmed.ali@example.com", specialty: "القانون المدني", experience: "5 سنوات", degree: "ماجستير في القانون", date: "1445/4/17 هـ" },
  { id: 2, name: "سارة أحمد الزهراني", email: "sara.zahrani@example.com", specialty: "قانون الأسرة", experience: "8 سنوات", degree: "دكتوراه في القانون", date: "1445/4/10 هـ" },
  { id: 3, name: "خالد عبدالله العمري", email: "khalid.omari@example.com", specialty: "القانون الجنائي", experience: "12 سنة", degree: "دكتوراه في القانون", date: "1445/4/5 هـ" },
];

// --- المكونات المصممة ---
const PageHeader = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: `linear-gradient(135deg, ${colors.lightBlack} 0%, ${colors.black} 100%)`,
  border: `1px solid ${alpha(colors.gold, 0.2)}`,
  color: colors.white,
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    backgroundColor: colors.lightBlack,
    borderRadius: '16px',
    border: `1px solid ${alpha(colors.white, 0.1)}`
}));

// --- تعريف تنسيقات الخلايا باستخدام sx ---
const tableHeadCellSx = {
    fontFamily: 'Cairo, sans-serif',
    color: colors.gold,
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'center',
    borderBottom: `2px solid ${colors.gold}`,
};

const tableBodyCellSx = {
    fontFamily: 'Cairo, sans-serif',
    color: colors.textSecondary,
    borderBottom: `1px solid ${alpha(colors.white, 0.1)}`,
    textAlign: 'center',
};

const getInitial = (name) => name ? name.trim()[0] : '';

export default function JobApplicationsTable() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: 'Cairo, sans-serif' }}>
      <PageHeader>
        <AssignmentIndIcon sx={{ fontSize: 40, color: colors.gold, ml: 2 }} />
        <Box>
          <Typography variant="h4" fontWeight="bold">طلبات التوظيف</Typography>
          <Typography variant="body1" sx={{ color: colors.textSecondary }}>عرض وإدارة طلبات المتقدمين</Typography>
        </Box>
      </PageHeader>

      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadCellSx}>المتقدم</TableCell>
              <TableCell sx={tableHeadCellSx}>التخصص</TableCell>
              <TableCell sx={tableHeadCellSx}>الخبرة</TableCell>
              <TableCell sx={tableHeadCellSx}>تاريخ التقديم</TableCell>
              <TableCell sx={tableHeadCellSx}>إجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id} sx={{ '&:hover': { backgroundColor: alpha(colors.white, 0.05) } }}>
                <TableCell sx={{...tableBodyCellSx, width: '30%'}}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: colors.gold, color: colors.black, fontWeight: "bold" }}>
                      {getInitial(app.name)}
                    </Avatar>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ fontWeight: "bold", color: colors.white }}>{app.name}</Typography>
                      <Typography variant="body2">{app.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ ...tableBodyCellSx, color: colors.white }}>{app.specialty}</TableCell>
                <TableCell sx={tableBodyCellSx}>
                  <Typography sx={{ fontWeight: 'bold', color: colors.white }}>{app.experience}</Typography>
                  <Typography variant="body2">{app.degree}</Typography>
                </TableCell>
                <TableCell sx={tableBodyCellSx}>{app.date}</TableCell>
                <TableCell sx={tableBodyCellSx}>
                  <IconButton sx={{ color: colors.gold, '&:hover': { backgroundColor: alpha(colors.gold, 0.1)} }} onClick={() => navigate(`/job-requests/${app.id}`)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}