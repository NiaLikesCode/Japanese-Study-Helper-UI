const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const TerserPlugin = require('terser-webpack-plugin');
//const postcssNormalize = require('postcss-normalize');
const commonConfig= require('./webpack.config.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        publicPath: './'
    },
    module: {
        rules: [
            /*{
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            },*/
            {
                test:/\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                getLocalIdent: getCSSModuleLocalIdent
                            }
                        }
                    },
                    /*{
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flextbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: {
                                        flexbox: 'no-2009',
                                      },
                                      stage: 3
                                }),
                                postcssNormalize()
                            ]
                        }
                    },*/
                    'resolve-url-loader', 
                    'sass-loader'
                ],
                sideEffects: true
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true
                    }
                }
            }),
            new TerserPlugin({
                parallel: true,
                cache: true,
                sourceMap: true
            })
        ],
        //splitChunks: {chunks: "all"}
    }
})