var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.resolve(__dirname, "src");

module.exports = {
  devtool: 'source-map',
  entry : ['whatwg-fetch',SRC_DIR + "/app/index.js"],
  output : {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module : {
   loaders: [
    {
        test: /\.js?/,
        loaders: [ 'babel-loader' ],
        exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i, 
      loader: "url-loader?name=app/images/[name].[ext]"
    }] 
  }
}