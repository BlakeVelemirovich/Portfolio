const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
        {
            test: /\.(sass|scss)$/,
            use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
        }
    ]
},
plugins: [new MiniCssExtractPlugin()]
};