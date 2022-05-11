const path = require("path");

module.export = {
  mode: "dev",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  watch: true,
};
