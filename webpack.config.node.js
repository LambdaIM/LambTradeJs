const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry:{
    sdk:'./contactLogic/index.js',
    // test:"./test/index.js"
  } ,
  mode:'development',
  target: 'node',
  output: {
    library: 'sdk',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'nodedist'),
    filename: '[name].bundle.js',
  },
  externals: [nodeExternals()],
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