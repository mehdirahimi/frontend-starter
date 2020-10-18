// Use the Node.js path module
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    /**
                     * While developing, using style-loader (Adds CSS to the DOM by injecting a `<style>` tag)
                     * is faster than extracting the styles each time. But in production, you should extract
                     * the styles in separate files to avoid the loading glitch in your web.
                     */
                    argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',

                    // The css-loader interprets @import and url() like import/require() and will resolve them
                    'css-loader',

                    // Loads a Sass/SCSS file and compiles it to CSS
                    'sass-loader',
                ],
            },
            {
                // Font-Awesome
                test: /fa-.*\.(ico|png|jpg|jpeg|gif|svg|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                use: { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'assets/font/fortawesome/' } }
            },
            {
                // Nested rules for the same exclude
                exclude: [path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts')],
                rules: [
                    {
                        test: /\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                        use: { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'assets/font/misc/' } }
                    },
                    {
                        test: /\.(ico|png|jpg|jpeg|gif|svg)(\?.*)?$/,
                        use: { loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'assets/img/misc/' } }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        })
    ],
    optimization: {}
});