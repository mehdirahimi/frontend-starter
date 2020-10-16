const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './src/sass/main.scss'
    ],
    output: {
        filename: "[name].bundle.css",
        path: path.resolve(__dirname, "dist"),

    },
    plugins: [

    ],
    module: {
        rules: []
    },
    optimization: {

    }
};