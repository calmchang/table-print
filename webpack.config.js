const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production',//'production','development'//打包模式，开发模式下不压缩
  // devtool: 'inline-source-map',//sourcemap模式
  entry: {index:'./src/index.js'},
  output: {
    libraryTarget:'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library:'table-print',
  },
  externals:{
    'react': {
      'commonjs': 'react',
      'commonjs2': 'react',
      'amd': 'react',
      // React dep should be available as window.React, not window.react
      'root': 'React'
    },
    'react-dom': {
      'commonjs': 'react-dom',
      'commonjs2': 'react-dom',
      'amd': 'react-dom',
      'root': 'ReactDOM'
    },
  },
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
        exclude: /node_modules/,
        use:[
          // {
          //   loader:MiniCssExtractPlugin.loader,
          // },
          "style-loader",
          {
            loader: 'css-loader',
            options: { importLoaders: 2, modules: false },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  },
  optimization:{
    minimize: true , // 是否压缩js
    minimizer: [
      new TerserPlugin({
        parallel:true,
      }),
      new OptimizeCssAssetsPlugin({}),//压缩css,配合MiniCssExtractPlugin使用
    ],
  },
  plugins:[
    // new MiniCssExtractPlugin({filename:`[name].css`}),
    // new BundleAnalyzerPlugin(),
    // new webpack.ProvidePlugin({
    //   react: ['react'],
    //   antd:['antd']

    // })
  ]
};