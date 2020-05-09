const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.BABEL_ENV = 'dvelopment';
process.env.NODE_ENV = 'development';

module.exports = {
    mode: 'production',
    bail: 'true',
    entry: './src/index.js',
    output: {
      path: paths.appBuild,
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: paths.servedPath
    },
    optimization: {
      minimize: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.(sass|scss|css)$/,
            exclude: /node_modules/,
            loader: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        sourceMap: false,
                        importLoaders: 1,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: false
                  }
                }
            ]
        }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: __dirname + "/src/index.html",
          filename: "./index.html",
          inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].css'
        })
    ]
};