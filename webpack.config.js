const path = require('path');
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
  // file paths
  const configPath = path.join(__dirname);
  const distPath = path.join(configPath, 'dist');

  const config = {
    entry: ["core-js/stable", "regenerator-runtime/runtime", "./lib/index.js"],
    output: {
      publicPath: '/',
      filename: 'index.js',
      path: distPath,
      libraryTarget: 'commonjs2',
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: "/node_modules",
          use: ['babel-loader']
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin()
    ],
  }

  return config;
}
