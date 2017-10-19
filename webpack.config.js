var path = require('path');
 
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
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
    // ,{
    //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //   loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    // },
	 ]
  }
};

module.exports = config;