const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.jsx'),
    background: path.resolve(__dirname, 'src/background/background.js'),
    app: path.resolve(__dirname, 'src/components/App/App.jsx'),
    marketData: path.resolve(__dirname, 'src/assets/marketData.js'),
    SearchBox: path.resolve(
      __dirname,
      'src/components/SearchBox/SearchBox.jsx',
    ),
    Watchlist: path.resolve(__dirname, 'src/components/Watchlist/Watchlist.js'),
    SymbolCard: path.resolve(
      __dirname,
      'src/components/SymbolCard/SymbolCard.js',
    ),
    CustomScrollBar: path.resolve(
      __dirname,
      'src/components/CustomScrollbar/CustomScrollBarContainer.js',
    ),
    ThemeSwitch: path.resolve(
      __dirname,
      'src/components/ThemeSwitch/ThemeSwitch.js',
    ),
    helpers: path.resolve(__dirname, 'src/utils/helpers.mjs'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.svg/,
        exclude: /node_modules/,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.mjs'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'Crypto Tracker',
      template: 'src/assets/template.html',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
};
