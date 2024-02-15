import {
  binanceCryptoIcons,
  binanceEtfIcons,
  binanceCurrencyIcons,
} from 'binance-icons';
import { writeFile } from 'fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const marketDataUrl = 'https://api.binance.com/api/v3/exchangeInfo';
try {
  const data = await fetch(marketDataUrl);
  const parsedData = await data.json();

  const tradingMarketsOnly = parsedData.symbols.filter(
    (symbol) => symbol.status === 'TRADING',
  );
  const allIcons = [binanceCryptoIcons, binanceEtfIcons, binanceCurrencyIcons];
  const updatedMarkets = tradingMarketsOnly.map((exchange) => {
    let icon = '';
    const baseAssetForSearch = exchange.baseAsset.toLowerCase();

    const foundIconSet = allIcons.find((iconSet) =>
      iconSet.has(baseAssetForSearch),
    );

    if (foundIconSet) {
      icon = foundIconSet.get(baseAssetForSearch);
    }

    return {
      symbol: exchange.symbol,
      baseAsset: exchange.baseAsset,
      endingAsset: exchange.quoteAsset,
      status: exchange.status,
      icon,
      test: 'a',
    };
  });

  const contentFile = `module.exports.marketData = ${JSON.stringify(
    updatedMarkets,
    null,
    2,
  )}`;

  writeFile(`${__dirname}/marketData.js`, contentFile, 'utf8', (err) => {
    if (err) {
      console.log(err);
      throw Error('Failed writing markets in file');
    } else {
      console.log('File written successfully!');
    }
  });
} catch (e) {
  console.log(e);
  throw new Error('Failed to create the market data file');
}
