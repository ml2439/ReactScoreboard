var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/dist/assets',
        filename: 'bundle.js',
        publicPath: 'assets'
    },
    devServer: {
        inline: true,
        contentBase: __dirname + '/dist',
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['latest', 'stage-0', 'react']
                    }
                }
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'json-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    }
}