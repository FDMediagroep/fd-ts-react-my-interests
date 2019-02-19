/**
 * This Webpack config is used for bundling files for the demo.
 */

const webpack = require("webpack");
const path = require('path');

console.info('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV));

module.exports = {
    entry: {
        "demo": ["./demo/demo.tsx"]
    },
    optimization: {
        minimize: true
    },
    output: {
        path       : path.join(__dirname, '/dist'),
        filename   : '[name].js',
        chunkFilename   : '[name].chunk.js',
        publicPath : ''
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']/*,
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }*/
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by a TypeScript loader
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: 'tsconfig.demo.json'
                    }
                }]
            }
        ]
    }
};