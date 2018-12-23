const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const r = path.resolve.bind(path, __dirname);

module.exports = {
  resolve: {
    extensions: [
      '.jsx',
      '.js',
    ],
    alias: {
      containers: 'components/containers',
      presents: 'components/presents',
    },
    modules: [
      'node_modules',
      r('src/js'),
    ],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      MODE: '"development"',
    }),
  ],
};
