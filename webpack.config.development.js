const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const dotenv = require('dotenv');
const {
  outputConfig,
  copyPluginPatterns,
  entryConfig,
  devServer,
} = require("./env.config");

module.exports = (env, options) => {
   // call dotenv and it will return an Object with a parsed key 
   const envVal = dotenv.config().parsed;

   // reduce it to a nice object, the same as before
   const envKeys = Object.keys(envVal).reduce((prev, next) => {
     prev[`process.env.${next}`] = JSON.stringify(envVal[next]);
     return prev;
   }, {});
  return {
    mode: options.mode,
    entry: entryConfig,
    devServer,
    // Dev only
    // Target must be set to web for hmr to work with .browserlist
    // https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    target: "web",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            // We're in dev and want HMR, SCSS is handled in JS
            // In production, we want our css as files
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env"]],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack", "url-loader"],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "javascript/auto",
          loader: "file-loader",
          options: {
            publicPath: "../",
            name: "[path][name].[ext]",
            context: path.resolve(__dirname, "src/assets"),
            emitFile: false,
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: "javascript/auto",
          exclude: /images/,
          loader: "file-loader",
          options: {
            publicPath: "../",
            context: path.resolve(__dirname, "src/assets"),
            name: "[path][name].[ext]",
            emitFile: false,
          },
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      fallback: {
        fs: false,
        constants: false,
        querystring: false,
        url: false,
        path: false,
        os: false,
        http: require.resolve("http-browserify"),
        https: require.resolve("https-browserify"),
        zlib: false,
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        vm: require.resolve("vm-browserify"),
      },
      alias: {
        "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
        "react/jsx-runtime.js": "react/jsx-runtime",
      },
    },
    output: {
      filename: "js/[name].bundle.js",
      path: path.resolve(__dirname, outputConfig.destPath),
      publicPath: "",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: true,
        minify: false,
      }),
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser",
      }),
      new CopyPlugin(copyPluginPatterns),
      new webpack.DefinePlugin(envKeys)
    ],
  };
};