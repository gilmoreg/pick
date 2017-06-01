const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './assets/javascript/app.js',
  },
  output: {
    filename: './public/bundle.js',
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
