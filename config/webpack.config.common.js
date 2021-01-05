const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const imageInlineSizeLimit = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
  );

module.exports = {
    entry: paths.appIndexJs,
    output: {
        filename: '[name].[contenthash].js',
        path: paths.appBuild,
        publicPath: './'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            filename: 'index.html',
            inject: true,
            template: paths.appHtml
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    formatter: 'react-dev-utils/eslintFormatter',
                    eslintPath: 'eslint',
                    resolvePluginRelativeTo: __dirname
                },
                include: paths.appSrc
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                //type: 'asset/inline',
                options: {
                  limit: imageInlineSizeLimit,
                  name: 'static/media/[name].[contenthash:8].[ext]',
                },
            },
            {
                loader: require.resolve('file-loader'),
                //type: 'asset/resource',
                exclude: [/\.(js|mjs|jsx|ts|tsx|scss)$/, /\.html$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[contenthash:8].[ext]',
                },
            }
        ]
    }
}