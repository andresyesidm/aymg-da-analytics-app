const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {context: "./src/infrastructure/python-scripts/", from: "*.py", to: 'python-scripts'},
        {context: "./src/assets/img/", from: "Logo.png", to: 'assets/img'}
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.json']
  },
};