const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.js',

   output:{
       path: path.join(__dirname, '/dist'),
       filename: 'index_bundle.js'
   },

  devtool: "source-map",

  module:{
      rules:[
          {test: /\.js$/, use: 'babel-loader', exclude: [path.resolve(__dirname, "node_modules")]},
          {test: /\.jsx$/, use: 'babel-loader', exclude: [path.resolve(__dirname, "node_modules")]},
          {test: /\.scss$/, use: 'sass-loader', exclude: [path.resolve(__dirname, "node_modules")]}
      ]
  },

  plugins:[
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
};