import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// الألوان الرئيسية
const colors = {
  gold: '#D4AF37',
  black: '#1A1A1A',
  white: '#FFFFFF',
  lightBlack: '#232323',
};

const CareersWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${colors.black} 0%, ${colors.lightBlack} 100%)`,
  color: colors.white,
  padding: theme.spacing(10, 2),
  minHeight: 'calc(100vh - 64px)',
  display: 'flex',
  alignItems: 'center',
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: `1px solid ${alpha(colors.gold, 0.3)}`,
  color: colors.white,
}));

const StyledTextField = styled(TextField)({
  '& label': {
    color: alpha(colors.white, 0.7),
    fontFamily: 'Cairo, sans-serif',
  },
  '& label.Mui-focused': {
    color: colors.gold,
  },
  '& .MuiInputBase-input': {
    color: colors.white,
    fontFamily: 'Cairo, sans-serif',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: alpha(colors.white, 0.3),
    },
    '&:hover fieldset': {
      borderColor: alpha(colors.gold, 0.7),
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.gold,
    },
  },
});

const StyledFormControl = styled(FormControl)({
    '& label': {
        color: alpha(colors.white, 0.7),
        fontFamily: 'Cairo, sans-serif',
    },
    '& label.Mui-focused': {
        color: colors.gold,
    },
    '& .MuiOutlinedInput-root': {
        color: colors.white,
        '& .MuiSvgIcon-root': {
            color: alpha(colors.white, 0.7),
        },
        '& fieldset': {
            borderColor: alpha(colors.white, 0.3),
        },
        '&:hover fieldset': {
            borderColor: alpha(colors.gold, 0.7),
        },
        '&.Mui-focused fieldset': {
            borderColor: colors.gold,
        },
    },
});

export default function Careers() {
  const [specialization, setSpecialization] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const specializations = [
    'قانون الشركات والتجارة',
    'التقاضي والتحكيم',
    'القانون العقاري والإنشاءات',
    'قانون العمل والعمال',
    'الملكية الفكرية',
    'القانون المصرفي والتمويل',
    'الأحوال الشخصية',
    'القانون الجنائي',
    'القانون الإداري',
  ];

  return (
    <CareersWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', fontFamily: 'Cairo, sans-serif', mb: 2 }}>
              انضم إلى فريقنا
            </Typography>
            <Typography sx={{ color: colors.gold, fontSize: '1.5rem', fontFamily: 'Cairo, sans-serif', mb: 3 }}>
              كن جزءاً من قصة نجاحنا.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Cairo, sans-serif', lineHeight: 1.8 }}>
              نحن في "محامي برو" نبحث دائماً عن العقول القانونية اللامعة والشغوفة بالتميز. إذا كنت تؤمن بقوة القانون في تحقيق العدالة وتطمح لبناء مسيرة مهنية ناجحة في بيئة عمل محفزة وداعمة، فنحن ندعوك لتقديم طلبك.
            </Typography>
          </Grid>

          <Grid item xs={12} md={7}>
            <FormPaper>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField fullWidth required label="الاسم الكامل" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField fullWidth required label="البريد الإلكتروني" type="email" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <StyledFormControl fullWidth variant="outlined">
                    <InputLabel>مجال التخصص المطلوب</InputLabel>
                    <Select
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      label="مجال التخصص المطلوب"
                      MenuProps={{
                          PaperProps: {
                              sx: { 
                                  backgroundColor: colors.lightBlack, 
                                  color: colors.white,
                                  border: `1px solid ${colors.gold}`
                              },
                          },
                      }}
                    >
                      {specializations.map((spec) => (
                        <MenuItem key={spec} value={spec} sx={{ fontFamily: 'Cairo, sans-serif' }}>
                          {spec}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        component="label"
                        variant="outlined"
                        fullWidth
                        startIcon={<UploadFileIcon />}
                        sx={{ 
                            color: alpha(colors.white, 0.8), 
                            borderColor: alpha(colors.white, 0.3),
                            fontFamily: 'Cairo, sans-serif',
                            py: 1.5,
                            '&:hover': {
                                borderColor: colors.gold,
                                backgroundColor: alpha(colors.gold, 0.1),
                                color: colors.gold,
                            }
                        }}
                    >
                        {fileName || 'تحميل السيرة الذاتية (PDF)'}
                        <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.5,
                      backgroundColor: colors.gold,
                      color: colors.black,
                      fontFamily: 'Cairo, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: colors.darkGold,
                      },
                    }}
                  >
                    إرسال الطلب
                  </Button>
                </Grid>
              </Grid>
            </FormPaper>
          </Grid>
        </Grid>
      </Container>
    </CareersWrapper>
  );
}