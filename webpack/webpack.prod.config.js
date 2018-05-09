var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: [
        path.join(parentDir, 'index.js')
    ],
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true,
        overlay: true
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                }
            ]
        },
        {
            test: /\.styl$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]___[hash:base64:5]'
                    }
                },
                'stylus-loader'
            ],
        },
        ]
    },
    plugins: [
        /**
         * This plugin assigns the module and chunk ids by occurence count. What this
         * means is that frequently used IDs will get lower/shorter IDs - so they become
         * more predictable.
         */
        new webpack.optimize.OccurenceOrderPlugin(),
        /**
         * Some of you might recognize this! It minimizes all your JS output of chunks.
         * Loaders are switched into a minmizing mode. Obviously, you'd only want to run
         * your production code through this!
         */
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
        /**
         * DefinePlugin allows us to define free variables, in any webpack build, you can
         * use it to create separate builds with debug logging or adding global constants!
         * Here, we use it to specify a development build.
         */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
}