const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');

module.exports = {
  mode: "development",

  plugins: [
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
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
                indentedSyntax: true
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
      }
    ]
  },

  devServer: {
    open: true,
    host: "localhost"
  },

  resolve: {
    extensions: [
      '.js', '.json','.vue'
    ],
    alias: {
      '@': path.join(__dirname, 'src'),
      'vue$': 'vue/dist/vue.esm.js'
    },
  }
};
