var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        sudokumaker: [
            './src/index.js',
        ], 
        'sudokumaker.min': [
            './src/index.js',
        ], 
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js',
        library: 'sudokumaker',
        libraryTarget: 'umd',
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-2'],
                plugins: [
                    'add-module-exports',
                    'transform-es2015-modules-umd',
                ],
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false,
            },
            comments: false
        }),
        new webpack.NoErrorsPlugin()
    ]
};