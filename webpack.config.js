var path = require('path');

var { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'iris.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
