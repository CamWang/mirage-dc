const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {

  output: {
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new WebpackBar({
      basic: false
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: true
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader"
      },
      {
        test: /.s(a|c)ss$/,

        use: [
          'vue-style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              }
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: "assets/[name].[ext]",
          esModule: false,
          limit: 8192,
        }
      },
    ]
  },

  devServer: {
    open: true,
    host: "localhost",
  },

  // devtool: 'eval-cheap-module-source-map',

  resolve: {
    extensions: ['.js', '.json','.vue'],
    alias: {
      '@': path.join(__dirname, 'src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
  },
};
