import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";

// --- نظام الألوان الموحد ---
const colors = {
  gold: '#D4AF37',
  white: '#FFFFFF',
};

const StyledSearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: colors.white,
    fontFamily: 'Cairo, sans-serif',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    
    // --- تصميم الإطار ---
    '& fieldset': {
      borderColor: alpha(colors.white, 0.2),
      transition: 'border-color 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: alpha(colors.gold, 0.7),
    },
    '&.Mui-focused fieldset': {
      borderColor: colors.gold,
    },

    // --- أيقونة البحث ---
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
        color: alpha(colors.white, 0.5),
        transition: 'color 0.3s ease',
    },
     '&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
        color: colors.gold,
    },
  },
  // --- النص المؤقت (Placeholder) ---
  '& .MuiInputBase-input::placeholder': {
    color: alpha(colors.white, 0.5),
    opacity: 1,
  },
}));


export default function SearchBar({ value, onChange }) {
  return (
    <StyledSearchBar
      placeholder="ابحث عن محامي أو موظف..."
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ maxWidth: 350, minWidth: 300 }}
    />
  );
}