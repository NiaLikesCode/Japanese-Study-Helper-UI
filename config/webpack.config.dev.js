const paths = require('./paths');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const postcssNormalize = require('postcss-normalize');

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
);

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.(scss|sass)$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        'style-loader',
      /*isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
      },*/
      {
        loader: 'css-loader',
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: 'postcss-loader',
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            // Adds PostCSS Normalize as the reset css with default options,
            // so that it honors browserslist config in package.json
            // which in turn let's users customize the target behavior as per their needs.
            postcssNormalize(),
          ],
          sourceMap: true,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: true,
          },
        },
        {
          loader: preProcessor,
          options: {
            sourceMap: true,
          },
        }
      );
    }
    return loaders;
  };

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname + paths.appBuild,
        pathinfo: true,
        filename: 'bundle.js',
        publicPath: '/',
        //chunkFilename: 'static/js/[name].chunk.js',
    },
    devtool: 'source-map',
    devServer: {
        //contentBase: path.resolve(__dirname, paths.appBuild),
        disableHostCheck: true,
        port: 3000,
        hot: true,
        contentBase: './',
        historyApiFallback: true
    },
    module: {
      rules: [
        {
            test: /\.js$/,
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
            oneOf: [
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('url-loader'),
                    options: {
                      limit: imageInlineSizeLimit,
                      name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
                {
                    test: /\.(js|jsx)$/,
                    include: paths.appSrc,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                      cacheDirectory: true
                    }
                },
                {
                    test: cssRegex,
                    exclude: cssModuleRegex,
                    use: getStyleLoaders({
                        importLoaders: 1,
                        sourceMap: true,
                    }),
                    // Don't consider CSS imports dead code even if the
                    // containing package claims to have no side effects.
                    // Remove this when webpack adds a warning or an error for this.
                    // See https://github.com/webpack/webpack/issues/6571
                    sideEffects: true,
                },
                    // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                    // using the extension .module.css
                {
                    test: cssModuleRegex,
                    use: getStyleLoaders({
                        importLoaders: 1,
                        sourceMap: true,
                        modules: {
                        getLocalIdent: getCSSModuleLocalIdent,
                        },
                    }),
                },
                {
                    test: sassRegex,
                    exclude: sassModuleRegex,
                    use: getStyleLoaders(
                      {
                        importLoaders: 2,
                        sourceMap: true,
                      },
                      'sass-loader'
                    ),
                    // Don't consider CSS imports dead code even if the
                    // containing package claims to have no side effects.
                    // Remove this when webpack adds a warning or an error for this.
                    // See https://github.com/webpack/webpack/issues/6571
                    sideEffects: true,
                },
                  // Adds support for CSS Modules, but using SASS
                  // using the extension .module.scss or .module.sass
                {
                    test: sassModuleRegex,
                    use: getStyleLoaders(
                        {
                        importLoaders: 2,
                        sourceMap: true,
                        modules: {
                            getLocalIdent: getCSSModuleLocalIdent,
                        },
                        },
                        'sass-loader'
                    ),
                },
                {
                    loader: require.resolve('file-loader'),
                    // Exclude `js` files to keep "css" loader working as it injects
                    // its runtime that would otherwise be processed through "file" loader.
                    // Also exclude `html` and `json` extensions so they get processed
                    // by webpacks internal loaders.
                    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                }
            ]
        }
      ]
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html",
          inject: "body"
        }),
        new WatchMissingNodeModulesPlugin(paths.appNodeModules)
    ]
};