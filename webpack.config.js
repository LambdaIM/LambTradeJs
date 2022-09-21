const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:{
    sdk:'./contactLogic/index.js',
    test:"./test/index.js"
  } ,
  mode:'development',
  target: 'web',
  output: {
    library: 'sdk',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
  },
  plugins: [new HtmlWebpackPlugin({
    template: './test/index.html'
  })],
};