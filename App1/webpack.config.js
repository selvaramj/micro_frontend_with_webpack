const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpackConfiguration = (env, argv) => {
  console.log("ENVIRONMENT", process.env, env, argv);
  const isProductionEnv = argv?.mode === "production";
  const isDevelopmentEnv = argv?.mode === "development";

  return {
    mode: "development",
    entry: "./src/app.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpep|jpg)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "images/",
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new HtmlPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopmentEnv ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDevelopmentEnv ? "[id].css" : "[id].[contenthash].css",
      }),
      new ModuleFederationPlugin({
        name: "app1",
        filename: "remoteEntry.js",
        exposes: {
          "./Header": "./src/components/Header",
        },
        // shared: {
        //   react: { singleton: true },
        //   "react-dom": { singleton: true },
        // },
        shared: {
          react: { singleton: true, eager: true },
          "react-dom": { singleton: true, eager: true },
          "react-router": { singleton: true, eager: true },
        },
      }),
    ],
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 3000,
    },
  };
};

module.exports = webpackConfiguration;
