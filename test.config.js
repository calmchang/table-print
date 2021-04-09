const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',//打包模式，开发模式下不压缩
  devtool: 'inline-source-map',//sourcemap模式
  devServer: {
    contentBase: './dist',
    open:true
  },
  entry: {index:'./test/index.js'},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
          options:{
              presets: [ 
                  "@babel/preset-react",
                  [
                    "@babel/preset-env",{
                        targets: {
                            chrome: "60",
                        },
                      }
                    ],
              ],
              // plugins: [
              //     ["@babel/plugin-transform-runtime"],
              // ] 
          }
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        // exclude: /src/,
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
          },
          {
            loader:'css-loader',
            options:{
              importLoaders: 2,
              modules:false,
            }
          },
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: `assets/[name].[ext]`,
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename:`[name].css`}),
    new HtmlWebpackPlugin({template: './test/index.html'}),
  ]
};