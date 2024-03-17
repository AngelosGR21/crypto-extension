const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.jsx'),
    background: path.resolve(__dirname, 'src/background/background.js'),
    app: path.resolve(__dirname, 'src/components/App.jsx'),
    marketData: path.resolve(__dirname, 'src/assets/marketData.js'),
    SearchBox: path.resolve(__dirname, 'src/components/SearchBox/SearchBox.js'),
    Watchlist: path.resolve(__dirname, 'src/components/Watchlist/Watchlist.js'),
    SymbolCard: path.resolve(
      __dirname,
      'src/components/SymbolCard/SymbolCard.js',
    ),
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
    extensions: ['.js', '.jsx'],
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
      title: 'Test App',
      template: 'src/assets/template.html',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
  },
};
