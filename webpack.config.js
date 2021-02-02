const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const shopData = require('./shop.json');

const sassVariables = Object.keys(shopData.colors)
    .map((color) => `$shop-color-${color}: ${shopData.colors[color]};`)
    .join(' ');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs/assets'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: sassVariables,
                        },
                    },
                ],
            }
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
};
