const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
process.traceDeprecation = true;
const WebpackGoogleCloudStoragePlugin = require('webpack-google-cloud-storage-plugin');

module.exports = {
  entry: ["babel-polyfill", "./scr/index.js"],
  output: {
    path: path.resolve(__dirname, "public/build"),
    filename: "[name].[hash].min.js",
    chunkFilename: "[name].[hash].js",

    publicPath: process.env.publicPath
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
      {
        test: /\.xsvg$/,
        use: [
          {
            loader: "thread-loader",
            // loaders with equal options will share worker pools
            options: {
              // the number of spawned workers, defaults to (number of cpus - 1) or
              // fallback to 1 when require('os').cpus() is undefined
              workers: 2,
              workerParallelJobs: 50,
              workerNodeArgs: ['--max-old-space-size=1024'],
              poolRespawn: false,
              poolParallelJobs: 50,
            }
          },
          {
            loader: 'babel-loader',
          },
          {
            loader: path.resolve('./loaders/xsvgLoader.js'),
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {
                  removeAttrs: { attrs: '(xmlns.*|xml.*)' },
                },
                {
                  inlineStyles: {
                    onlyMatchedOnce: false,
                    removeMatchedSelectors: true,
                    useMqs: ['', 'screen'],
                    usePseudos: ['']
                  }
                },
                { removeViewBox: false },
                { mergePaths: false }
              ]
            }
          },
        ],
      },
      {
        test: /\.(eot|ttf|otf|woff2|woff|svg|gif|png|jpg)$/,
        use: [{ loader: 'file-loader' }],
      },
    ]
  },
  optimization: {
    runtimeChunk: 'single',
     minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
        
      })
    ],
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new WebpackGoogleCloudStoragePlugin({
      directory: path.resolve(__dirname, 'public/build'),
      include: [/.*\.js/],
      storageOptions: {
        projectId: process.env.projectId,
        // credentials: require(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      },
      uploadOptions: {
        bucketName: process.env.bucketName,
        destinationNameFn: file =>
           path.join('flightcrsui/assets/js', file.name)
        ,
        metadataFn: file => ({
          cacheControl: 'public, max-age=31536000',
        }),
        gzip: true,
        makePublic: true,
        resumable: true,
        concurrency: 5,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      inject: "body",
      tenantToken: process.env.tenantToken || '',
    })
  ]
};
