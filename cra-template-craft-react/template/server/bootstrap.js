require("dotenv").config();

require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: ["../src"],
      },
    ],
    // ["file-loader", {
    //   "name": "[path][name].[ext]",
    //   "emitFile": false,
    //   "extensions": ["csv"]
    //   // "extensions": ["png", "jpg", "jpeg", "gif", "svg"],
    //   // "publicPath": "/public",
    //   // "outputPath": "/public",
    //   // "context": "",
    //   // "limit": 0
    // }]
  ],
});

require("./index");
