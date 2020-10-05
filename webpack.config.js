const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, './src/img'),
      '@card-stack': path.resolve(__dirname, './src/scripts/card-stack'),
      '@const': path.resolve(__dirname, './src/scripts/const'),
      '@utils': path.resolve(__dirname, './src/scripts/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  devServer: {
    contentBase: 'dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test(path) {
          return path.endsWith('.js') && !path.endsWith('.test.js');
        },
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
