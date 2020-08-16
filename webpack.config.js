const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.test' });
} else { // production

}

module.exports = (env, argv) => {
  const isProduction = (env === 'production');

  return {
    mode: env,
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'), // where I want the output placed
      filename: 'bundle.js', // name of the initial chunk
      publicPath: "/dist/"   // root path for retrieval of chunks in running app
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  return path.join(__dirname, 'public', 'dist') + '/'
                }
              }
            },
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
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/dist/',
      historyApiFallback: true,
      hot: true,
      port: 8080,
      compress: true
    }
  }
};
