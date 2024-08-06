const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3000';

module.exports = {
  mode: 'development', // Set mode to development
  entry: ['/src/index.tsx'],
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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'], // Use the react preset
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-typescript'], // Use the react and typescript presets
            },
          },
        ],
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
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'fabhotels-42',
      project: 'flight-crs-frontend',
    }),
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
