'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');


const config = {
    cache: true,
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    context: Path.join(__dirname),
    entry: {
        script: './src/index'
    },
    output: {
        path: Path.join(__dirname, 'build'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/static/',
    },
    recordsPath: Path.join(__dirname, 'recordsCache'),
    module: {
        rules: [{
            test: '/\js$/',
            exclude: '/node_modules/',
            use: [
                {
                    loader: 'ng-annotate-loader',
                },
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
                {
                    loader: 'string-replace-loader',
                    options: {
                        multiple: [
                            { search: '/API_URL/g', replace: process.env['PLUNKER_API_URL'] },
                            { search: '/EMBED_URL/g', replace: process.env['PLUNKER_EMBED_URL'] },
                            { search: '/RUN_URL/g', replace: process.env['PLUNKER_RUN_URL'] },
                            { search: '/SHOT_URL/g', replace: process.env['PLUNKER_SHOT_URL'] },
                            { search: '/WWW_URL/g', replace: process.env['PLUNKER_WWW_URL'] },
                        ],
                    },
                },
            ]
        },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true,
        }),
    ],
    resolve: {
        modules: [
            Path.join(__dirname, 'node_modules'),
            Path.join(__dirname, 'src'),
        ],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
};

module.exports = config;