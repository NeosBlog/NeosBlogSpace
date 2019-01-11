const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = {
    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: {
        home: [
            './Resources/Private/JavaScript/index.js',
            __dirname + '/Resources/Private/StyleSheets/index.css',
        ],
    },
    output: {
      path: __dirname + '/Resources/Public/Frontend/',
      filename: 'index.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[local]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(__dirname + '/Resources/Public/Frontend/', {}),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'index.min.css'
        })
    ],
    optimization: {
        splitChunks: {
            name: 'Vendor'
        },
        minimizer: []
    },
};


webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
        uglifyOptions: {
            sourceMap: true,
            minimize: true,
            compress: {
                keep_fnames: true,
                warnings: false
            },
            mangle: {
                keep_fnames: true
            }
        }
    })
);

module.exports = webpackConfig;