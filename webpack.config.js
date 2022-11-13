const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackWebpackPlugins = require('copy-webpack-plugin')

const isDev = process.env.NODE_ENV ==='development';
const isProd = !isDev;
const filename = (ext)=>isDev?`[name].${ext}`:`[name].[contenthash].${ext}`;

module.exports={
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: './main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        publicPath: ""
    },
    devServer: {
        historyApiFallback: true,
        static: {
          directory: path.join(__dirname,'app')
        },
        open: true,
        compress:true,
        hot: true,
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: "index.html",

        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/store.html'),
            filename: "store.html",

        }),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/service.html'),
            filename: "service.html",

        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`,
        }),
        new CopyWebpackWebpackPlugins({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'app'),
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                },
            },
            {
                test: /\.html/,
                loader: "html-loader",
                options: {
                    minimize: false
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev
                        }
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.s[as]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context)=>{
                                return path.relative(path.dirname(resourcePath),context)+'/';
                            }
                        }
                    },
                    'css-loader',
                    'sass-loader'],
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: './assets/img/[name].[hash:6][ext]'
                }
            },
            {
                test: /\.(?:|otf|ttf)$/,
                type: "asset/resource",
                generator: {
                    filename: './assets/fonts/[name][ext]'
                }
            }
        ]
    }
};