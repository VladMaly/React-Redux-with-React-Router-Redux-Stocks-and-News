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
         * NoErrorsPlugin prevents your webpack CLI from exiting with an error code if
         * there are errors during compiling - essentially, assets that include errors
         * will not be emitted. If you want your webpack to 'fail', you need to check out
         * the bail option.
         */
        new webpack.NoEmitOnErrorsPlugin(),
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