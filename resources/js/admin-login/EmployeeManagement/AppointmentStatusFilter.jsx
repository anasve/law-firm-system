import React from "react";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// بيانات مالية تجريبية - هذه البيانات التي ستُعرض
const financialData = [
  {
    id: 1,
    date: "2024-05-20",
    client: "محمد العبدالله",
    service: "استشارة قانونية",
    amount: 500,
    status: "مدفوع"
  },
  {
    id: 2,
    date: "2024-05-21",
    client: "سعيد الخالدي",
    service: "عقد تجاري",
    amount: 1500,
    status: "معلق"
  }
];

// --- مكونات مصممة ---
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.07)',
}));

const StyledHeaderCell = styled(TableCell)({
  fontFamily: 'Cairo, sans-serif',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '20px',
  fontSize: '1rem',
});

// لقد قمت بتغيير اسم المكون ليعكس وظيفته الجديدة بشكل أفضل
export default function FinancialPage() {

  const handleConfirm = (row) => {
    console.log("تأكيد الدفع:", row);
  };

  const handleEdit = (row) => {
    console.log("تعديل:", row);
  };

  const handleDelete = (row) => {
    console.log("حذف:", row);
  };

  return (
    <Box>
      {/* جدول التفاصيل المالية */}
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="financial table">
          <TableHead>
            <TableRow>
              <StyledHeaderCell>التاريخ</StyledHeaderCell>
              <StyledHeaderCell>العميل</StyledHeaderCell>
              <StyledHeaderCell>الخدمة</StyledHeaderCell>
              <StyledHeaderCell>المبلغ</StyledHeaderCell>
              <StyledHeaderCell>الحالة</StyledHeaderCell>
              <StyledHeaderCell>الإجراءات</StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financialData.map((row) => (
              <TableRow 
                key={row.id} 
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>{row.client}</TableCell>
                <TableCell align="center">{row.service}</TableCell>
                <TableCell align="center">{row.amount} ريال</TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.status}
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "14px",
                      background: row.status === "مدفوع" ? "#43a047" : "#ffa726",
                      minWidth: '90px',
                      borderRadius: '8px',
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="تأكيد الدفع">
                    <IconButton color="success" onClick={() => handleConfirm(row)}>
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="تعديل">
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="حذف">
                    <IconButton color="error" onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}