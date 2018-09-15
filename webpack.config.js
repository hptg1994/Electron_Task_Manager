var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  return {
    entry: ["babel-polyfill", './src/index.js'],
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }]
    },
    plugins: [CSSExtract],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/',
      port: 4172
    }
  }
};
