import { CLOSED, CONNECTING, OPEN } from '../../utils/constants';
import { StyledSymbolPrice } from './SymbolCardStyles';
import { LineWave } from 'react-loader-spinner';

const SymbolPrice = ({ connectionStatus, price }) => {
  if (connectionStatus === CONNECTING) {
    return (
      <StyledSymbolPrice>
        <LineWave height={30} width={40} color='#CE8D24' />
      </StyledSymbolPrice>
    );
  }

  if (connectionStatus === OPEN) {
    return <StyledSymbolPrice>{price}</StyledSymbolPrice>;
  }

  if (connectionStatus === CLOSED) {
    return null;
  }

  return <StyledSymbolPrice>SymbolPrice</StyledSymbolPrice>;
};

export default SymbolPrice;
