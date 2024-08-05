const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackGoogleCloudStoragePlugin = require('webpack-google-cloud-storage-plugin');

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './index.js'], // Include polyfills for broader browser support
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: '[name].[contenthash].min.js', // Use contenthash for long-term caching
    chunkFilename: '[name].[contenthash].js',
    publicPath: process.env.publicPath || '/', // Set dynamically or default to root
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Support for JS, JSX, TS, and TSX
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
              'react-native-web', // Handle react-native-web specific transformations
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/, // Handle both SCSS and CSS
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|ttf|otf|woff2|woff|svg|gif|png|jpg)$/, // Handle fonts and images
        use: [
          {loader: 'file-loader', options: {name: '[path][name].[hash].[ext]'}},
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single', // Extract runtime code into a separate chunk
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs for production
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BASE_URL: JSON.stringify(process.env.BASE_URL || ''),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      inject: 'body',
      tenantToken: process.env.tenantToken || '',
    }),
    new WebpackGoogleCloudStoragePlugin({
      directory: path.resolve(__dirname, 'public/build'),
      include: [/.*\.js/],
      storageOptions: {
        projectId: process.env.projectId,
      },
      uploadOptions: {
        bucketName: process.env.bucketName,
        destinationNameFn: file =>
          path.join('flightcrsui/assets/js', file.name),
        metadataFn: file => ({cacheControl: 'public, max-age=31536000'}),
        gzip: true,
        makePublic: true,
        resumable: true,
        concurrency: 5,
      },
    }),
  ],
};
