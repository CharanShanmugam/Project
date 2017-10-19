var path = require('path');
 
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
  devtool: 'source-map',
  entry: ['whatwg-fetch',SRC_DIR + "/app/index.js"],
  output: { 
    path: DIST_DIR + "/app", 
    filename: 'bundle.js',
    publicPath: "/app/" 
  },
  module: {
    loaders: [
  	 {
        test: /\.js?/,
        loader: 'babel-loader',
        include: SRC_DIR,
        query: {
          presets: ['es2015', 'react']
    	 }
  	 },
     {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }
	 ]
  }
};

module.exports = config;