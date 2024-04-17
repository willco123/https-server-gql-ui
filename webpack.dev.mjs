import "dotenv/config";
import path from "path";
import ReactRefreshTypeScript from "react-refresh-typescript";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import fs from "fs";
import webpack from "webpack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3002;
const connectionProtocol = process.env.CONN_PROTOCOL;
const host = process.env.DOMAIN;

const Config = {
  entry: path.resolve(process.cwd(), "./src/index.tsx"),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts-loader",
        // options: {},
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()].filter(Boolean),
              }),
              // transpileOnly: isDevelopment,
            },
          },
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    extensionAlias: {
      ".js": [".tsx", ".ts", ".js"],
      ".mjs": [".mts", ".mjs"],
    },
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
  },
  devServer: {
    // static: {
    //   directory: path.join(__dirname, "public/"),
    // },

    // allowedHosts: ["myspa.example"],
    host,
    server: {
      type: connectionProtocol || "http",
      options: connectionProtocol
        ? {
            key: fs.readFileSync("./mySpa.example-key.pem"),
            cert: fs.readFileSync("./mySpa.example.pem"),
          }
        : {},
    },
    port,
    hot: "only",
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      "process.env.DOMAIN": JSON.stringify(process.env.DOMAIN),
      "process.env.CONN_PROTOCOL": JSON.stringify(process.env.CONN_PROTOCOL),
      "process.env.API_PORT": JSON.stringify(process.env.API_PORT),
      "process.env.API_DOMAIN": JSON.stringify(process.env.API_DOMAIN),
    }),
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("./public/index.html"),
      publicPath: "",
      // favicon: path.resolve("./public/favicon.ico"),
    }),
  ].filter(Boolean),
};

export default Config;
