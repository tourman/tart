const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      MODE: '"development"',
    }),
  ],
};
