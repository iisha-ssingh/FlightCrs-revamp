const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';

module.exports = {
  mode: 'development', // Set mode to development
  entry: ['./index.js'],
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: '[name].[contenthash].js', // Use contenthash for better caching
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!react-native)/, // Include react-native in the transpilation
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-typescript',
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              'react-native-web', // Add this to handle react-native-web specific transformations
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: any) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },

  devServer: {
    static: './public',
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    allowedHosts: ['flightcrs.fabhotels.com'],
    proxy: [
      {
        context: ['/admin/flightcrs/flightaggregation/**'],
        target: 'https://uat.fabmailers.in/',
        secure: false,
        changeOrigin: true,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BASE_URL: JSON.stringify('/admin/flightcrs'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      inject: 'body',
      tenantToken:
        process.env.tenantToken || '0ec8cb68-7e6d-4aa1-b21e-634a49824e63',
    }),
    // new ESLintPlugin({  // Add ESLint plugin for real-time linting
    //   extensions: ['js', 'jsx'],
    //   exclude: 'node_modules'
    // }),
    // new webpack.DefinePlugin({  // Define environment variables
    //   'process.env.NODE_ENV': JSON.stringify('development'),
    //   'process.env.DEBUG': JSON.stringify(process.env.DEBUG || 'false'),
    // }),
  ],
};
