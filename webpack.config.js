const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    home: './assets/javascript/home.js',
    poll: './assets/javascript/poll.js',
  },
  output: {
    path: path.join(__dirname, 'public/scripts'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        presets: [
          ['es2015', { modules: false }],
        ],
      },
    }),
  ],
};
