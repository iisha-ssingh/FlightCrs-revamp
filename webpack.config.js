const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ESLintPlugin = require('eslint-webpack-plugin');

const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "3008";

module.exports = {
  mode: 'development',  // Set mode to development
  entry: ["babel-polyfill", "./src/index.js"],
  devtool: 'eval-source-map', 
  output: {
    path: path.resolve(__dirname, "public/build"),
    filename: "[name].[contenthash].js",  // Use contenthash for better caching
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-react'] // Use the react preset
            }
          },
        ],
      },
    ]
  },
  optimization: {
    minimize: false,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  },

  devServer: {
    static: './public',
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    allowedHosts: ['flightcrs.fabhotels.com'],
    proxy: [
        {
            context: ["/admin/flightcrs/fabuser/**"],
            target: "https://www.fabmailers.in",
            secure: false,
            changeOrigin: true
          },
          {
            context: ["/admin/flightcrs/fabcrs/**"],
            target: "https://www.fabmailers.in",
            secure: false,
            changeOrigin: true
          },
          {
            context: ["/admin/flightcrs/flightaggregation/**"],
            target: "https://www.fabmailers.in",
            secure: false,
            changeOrigin: true
          },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      inject: "body",
      tenantToken: process.env.tenantToken || '',
    }),
    // new ESLintPlugin({  // Add ESLint plugin for real-time linting
    //   extensions: ['js', 'jsx'],
    //   exclude: 'node_modules'
    // }),
    new webpack.DefinePlugin({  // Define environment variables
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG || 'false'),
    }),
  ]
};