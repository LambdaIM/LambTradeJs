const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode:'development',
  target: 'node',
  externals: [nodeExternals()],
  
};