const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // lo unico q me interesa es esta funcion
const path = require('path');

module.exports = {

    mode: 'production',
    optimization: {
        // minimize: true,
        minimizer: [ 
            // new CssMinimizerPlugin() 
            new OptimizeCssAssetsPlugin(),
        ],
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                //babel
                test: /\.m?js$/i,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false, // true para q lo reduzca
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            // filename: '[name].[contenthash].css',
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        }),
        // new MinifyPlugin(minifyOpts, pluginOpts)
        new MinifyPlugin(),
        
    ]


}