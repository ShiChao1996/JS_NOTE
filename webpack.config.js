var path = require('path');
module.exports = {
  entry: "./Code/set&map.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'codeSegment'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015',"stage-3"]
        }
      }
    ]
  }
}