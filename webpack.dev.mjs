import "dotenv/config";
import path from "path";
import ReactRefreshTypeScript from "react-refresh-typescript";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from "dotenv-webpack";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3002;
const connectionProtocol = process.env.CONN_PROTOCOL;
const host = process.env.DOMAIN;
const skipTS = process.env.SKIP_TS;

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
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
          options: {
            env: { coreJs: 3, mode: "usage" },
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
                dynamicImport: true,
                decorators: true,
              },
              loose: true,
              transform: {
                decoratorMetadata: true,
                react: {
                  runtime: "automatic",
                  // refresh: true,
                },
              },
            },
          },
        },
        include: /src/,
      },
      // {
      //   test: /\.(ts|tsx)$/,
      //   exclude: /(node_modules)/,
      //   loader: "ts-loader",
      //   // options: {},
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // {
          //   loader: "ts-loader",
          //   options: {
          //     getCustomTransformers: () => ({
          //       before: [ReactRefreshTypeScript()].filter(Boolean),
          //     }),
          //     // transpileOnly: isDevelopment,
          //   },
          // },
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

    alias: {
      "@config": path.join(__dirname, "./src/config"),
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

    allowedHosts: ["myspa.example"],
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
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv(),
    new ReactRefreshWebpackPlugin(),
    skipTS !== "enabled" && new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("./public/index.html"),
      publicPath: "",
      // favicon: path.resolve("./public/favicon.ico"),
    }),
  ].filter(Boolean),
};

export default Config;
