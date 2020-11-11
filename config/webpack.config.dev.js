const { merge } = require('webpack-merge');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true
    },
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            /*{ if I ever want to use css
                test:/\.css$/,
                use: ['style-loader', 'css-loader']
            },*/
            {
                test:/\.(scss|sass)$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                getLocalIdent: getCSSModuleLocalIdent
                            }
                        },
                    },
                    /*{ If I need this then add it back in
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
    }
})