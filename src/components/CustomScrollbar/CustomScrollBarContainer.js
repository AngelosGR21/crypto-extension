import { Scrollbars } from '@om-tlh/react-custom-scrollbars';
import { Box, styled } from '@mui/material';
import { getLocalStorageTheme } from '../../helpers/helpers.mjs';

const StyledScrollBarBox = styled(Box)(({ theme, style }) => ({
  ...style,
  width: '8px',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.colors.darkerGold
      : theme.palette.colors.black,
  borderRadius: '5px',
}));

const CustomScrollBarContainer = ({ children, isSearch }) => {
  const theme = getLocalStorageTheme();
  const searchContainerStyles = {
    width: '90%',
    height: '390px',
    position: 'absolute',
    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#EAEAEA',
    zIndex: 1,
    boxShadow:
      theme === 'dark'
        ? 'rgba(255, 255, 255, 0.1) 0px 2px 8px'
        : 'rgb(0 0 0 / 45%) 0px 2px 8px',
  };
  const watchlistStyles = {
    height: '370px',
    position: 'relative',
  };

  return (
    <Scrollbars
      style={isSearch ? searchContainerStyles : watchlistStyles}
      renderThumbVertical={({ style, ...props }) => (
        <StyledScrollBarBox {...props} style={style} />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollBarContainer;
