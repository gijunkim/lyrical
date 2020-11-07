const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        // Preprocess your css files
        // you can add additional loaders here (e.g. sass/less etc.)
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },    
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};