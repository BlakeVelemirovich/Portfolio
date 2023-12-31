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
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
                outputPath: 'images',
                publicPath: 'images',
              },
            },
          ],
        }
    ]
},
plugins: [new MiniCssExtractPlugin()]
};