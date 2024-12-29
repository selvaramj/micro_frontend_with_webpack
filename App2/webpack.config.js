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
        name: "app2",
        filename: "remoteEntry.js",
        exposes: {
          "./Footer": "./src/components/Footer",
        },
        // shared: {
        //   react: { singleton: true },
        //   "react-dom": { singleton: true },
        // },
        shared: {
          react: { singleton: true, eager: true },
          "react-dom": { singleton: true, eager: true },
        },
      }),
    ],
    devServer: {
      port: 3001,
      static: path.join(__dirname, "dist"),
    },
  };
};

module.exports = webpackConfiguration;
