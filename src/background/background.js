import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
  stringifyMessage,
  constructInitialConnectionParams,
  getBinanceId,
} from '../utils/helpers.mjs';

const baseSocketUrl = 'wss://stream.binance.com:9443/ws';

const sendMessageStringified = (sendMessageFunc, objToSend) => {
  sendMessageFunc(objToSend);
};

export const useBinanceConnection = ({ watchlistSymbols }) => {
  const binanceId = getBinanceId();

  const symbolParams = constructInitialConnectionParams(watchlistSymbols);
  const { lastMessage, sendMessage, readyState } = useWebSocket(
    baseSocketUrl,
    {
      onOpen: (e) => {
        sendMessage(
          stringifyMessage({
            method: 'SUBSCRIBE',
            params: symbolParams,
            id: binanceId,
          }),
        );
      },
    },
    watchlistSymbols.length > 0,
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    sendMessage: (param) => sendMessageStringified(sendMessage, param),
    lastMessage:
      (connectionStatus === 'Open' &&
        lastMessage?.data &&
        JSON.parse(lastMessage?.data)) ||
      {},
    connectionStatus,
    binanceId,
  };
};
