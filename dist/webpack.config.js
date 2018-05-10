var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        libraryTarget: 'var',
        library: 'CellularAutomata',
        path: path.resolve(__dirname, 'dist')
    }
};
//# sourceMappingURL=webpack.config.js.map