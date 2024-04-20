import { styled, TextField, Box, Typography } from '@mui/material';

export const StyledSearchBox = styled(TextField)({
  margin: '0 auto',
  width: '100%',
});

export const StyledSearchResultsContainer = styled(Box)(({ theme }) => ({
  width: '90%',
  position: 'absolute',
  paddingTop: '8px',
  backgroundColor:
    theme.palette.mode === 'dark' ? '#1A1A1A' : theme.palette.colors.silver,
  zIndex: 1,
}));

export const StyledSearchAndResultsContainer = styled(Box)({
  width: '90%',
  margin: '8px auto 16px auto',
});

export const StyledNoMarketsTypography = styled(Typography)({
  textAlign: 'center',
  padding: '0 8px 8px 8px',
});
