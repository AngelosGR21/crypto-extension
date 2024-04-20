import {
  styled,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';

export const StyledCard = styled(Card)({
  width: '90%',
  margin: '0 auto 16px auto',
});

export const StyledCardContent = styled(CardContent)({
  width: '90%',
  alignItems: 'center',
});

export const StyledSymbolName = styled(Typography)({
  display: 'inline-block',
  marginRight: '16px',
});

export const StyledIconButton = styled(IconButton)(({ theme, icontype }) => ({
  ...((theme.palette.mode === 'dark' && {
    color: icontype === 'remove' ? '#FF5733' : theme.palette.colors.snowWhite,
  }) || {
    color: icontype === 'remove' ? '#E74C3C' : theme.palette.colors.black,
  }),
}));
