import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

// --- أيقونات MUI ---
import SearchIcon from "@mui/icons-material/Search";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // للقانون المدني
import GavelIcon from '@mui/icons-material/Gavel'; // للقانون الجنائي
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'; // للقانون التجاري
import WorkIcon from '@mui/icons-material/Work'; // لقانون العمل
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'; // لقانون الأسرة

// --- بيانات العرض ---
const LAWS_CATEGORIES = [
  { label: "القانون المدني", icon: <AccountBalanceIcon /> },
  { label: "القانون الجنائي", icon: <GavelIcon /> },
  { label: "القانون التجاري", icon: <BusinessCenterIcon /> },
  { label: "قانون العمل", icon: <WorkIcon /> },
  { label: "قانون الأسرة", icon: <FamilyRestroomIcon /> },
];

const LAWS = [
  { id: 1, category: "القانون المدني", title: "المادة 1: تعريف العقد", content: "العقد هو توافق إرادتين أو أكثر على إحداث أثر قانوني ملزم، سواء كان بإنشاء التزام أو نقله أو تعديله أو إنهائه.", date: "10/03/2022" },
  { id: 2, category: "القانون المدني", title: "المادة 2: أركان العقد", content: "أركان العقد الأساسية التي لا يقوم بدونها هي: التراضي، والمحل، والسبب. ويجب أن تكون هذه الأركان صحيحة ومشروعة.", date: "10/03/2022" },
  { id: 3, category: "القانون الجنائي", title: "المادة 1: تعريف الجريمة", content: "الجريمة هي كل فعل أو امتناع عن فعل يعاقب عليه القانون بنص صريح، وتُقسم إلى جنايات وجنح ومخالفات.", date: "15/06/2023" },
  { id: 4, category: "القانون التجاري", title: "المادة 5: الأعمال التجارية", content: "تعتبر أعمالًا تجارية جميع الأعمال التي يقوم بها التاجر لشؤون تتعلق بتجارته، بالإضافة إلى الأعمال المنصوص عليها قانونًا.", date: "21/08/2023" },
];

// --- نظام الألوان ---
const colors = {
  primary: '#3f51b5',
  background: '#FFFFFF',
  backgroundSubtle: '#F4F6F8',
  textPrimary: '#263238',
  textSecondary: '#546e7a',
  selectedBackground: 'rgba(63, 81, 181, 0.08)',
};

// --- مكونات مصممة ---
const Sidebar = styled(Box)(({ theme }) => ({
  width: 280,
  minHeight: 'calc(100vh - 64px)', // Adjust for potential header height
  background: colors.background,
  borderLeft: `1px solid ${alpha(colors.textPrimary, 0.1)}`,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  flexShrink: 0,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  margin: theme.spacing(0.5, 0),
  padding: theme.spacing(1.25, 2),
  color: colors.textSecondary,
  '& .MuiListItemIcon-root': {
    color: colors.textSecondary,
    minWidth: '40px',
  },
  '&:hover': {
    backgroundColor: colors.selectedBackground,
  },
  '&.Mui-selected': {
    backgroundColor: colors.selectedBackground,
    color: colors.primary,
    '& .MuiListItemText-primary': {
      fontWeight: 'bold',
    },
    '& .MuiListItemIcon-root': {
      color: colors.primary,
    },
    '&:hover': {
      backgroundColor: colors.selectedBackground,
    }
  }
}));

const SearchTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontFamily: 'Cairo, sans-serif',
        backgroundColor: colors.backgroundSubtle,
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            borderColor: alpha(colors.primary, 0.3),
        },
        '&.Mui-focused fieldset': {
            border: `2px solid ${colors.primary}`,
        },
    },
});

const LawCard = styled(Card)({
    height: '100%',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    }
});


// --- المكون الرئيسي ---
export default function LawsViewer() {
  const [selectedCategory, setSelectedCategory] = useState(LAWS_CATEGORIES[0].label);
  const [search, setSearch] = useState("");

  const filteredLaws = LAWS.filter(
    (law) =>
      law.category === selectedCategory &&
      (law.title.toLowerCase().includes(search.toLowerCase()) || law.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ display: "flex", width: "100%", background: colors.backgroundSubtle }}>
      <Sidebar>
        <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold', color: colors.textPrimary, fontFamily: 'Cairo, sans-serif' }}>
          تصنيفات القوانين
        </Typography>
        <Box sx={{ px: 1, mb: 2 }}>
            <SearchTextField
                fullWidth
                placeholder="بحث في القوانين..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: colors.textSecondary }} />
                    </InputAdornment>
                    ),
                }}
            />
        </Box>
        <List component="nav">
          {LAWS_CATEGORIES.map((cat) => (
            <StyledListItemButton
              key={cat.label}
              selected={selectedCategory === cat.label}
              onClick={() => setSelectedCategory(cat.label)}
            >
              <ListItemIcon>{cat.icon}</ListItemIcon>
              <ListItemText 
                primary={cat.label} 
                primaryTypographyProps={{ fontFamily: 'Cairo, sans-serif' }} 
              />
            </StyledListItemButton>
          ))}
        </List>
      </Sidebar>

      <Box component="main" sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: colors.textPrimary, fontFamily: 'Cairo, sans-serif' }}>
            {selectedCategory}
        </Typography>
        <Grid container spacing={3}>
          {filteredLaws.length > 0 ? (
            filteredLaws.map((law) => (
              <Grid item xs={12} sm={6} md={4} key={law.id}>
                <LawCard>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1.5, color: colors.textPrimary, fontFamily: 'Cairo, sans-serif' }}>
                      {law.title}
                    </Typography>
                    <Typography variant="body2" color={colors.textSecondary} sx={{ flexGrow: 1, fontFamily: 'Cairo, sans-serif' }}>
                      {law.content}
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 2, color: alpha(colors.textSecondary, 0.7), fontFamily: 'Cairo, sans-serif' }}>
                      تاريخ التعديل: {law.date}
                    </Typography>
                  </CardContent>
                </LawCard>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', p: 8 }}>
                    <Typography variant="h6" color={colors.textSecondary} sx={{ fontFamily: 'Cairo, sans-serif' }}>
                        لا يوجد مواد قانونية مطابقة لبحثك.
                    </Typography>
                </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}