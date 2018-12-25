const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
