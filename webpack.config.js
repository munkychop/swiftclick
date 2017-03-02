// webpack.config.js
const webpack = require('webpack');
const path = require('path');

const swiftclickEntryFile = './src/swiftclick.js';
const exampEntryFile = './src/example/js/app/app.js';
const jsModuleConfig = {
  rules: [{
    test: /\.js$/,
    include: path.resolve(__dirname, 'src'),
    use: [{
      loader: 'babel-loader',
      options: {
        presets: [
          ['es2015', { modules: false }]
        ]
      }
    }]
  }]
};

module.exports = [
  {
    name: 'uncompressed',
    entry: swiftclickEntryFile,
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'swiftclick.js',
      library: 'SwiftClick',
      libraryTarget: 'umd'
    },
    module: jsModuleConfig,
    devtool: 'source-map'
  },
  {
    name: 'compressed',
    entry: swiftclickEntryFile,
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'swiftclick.min.js',
      library: 'SwiftClick',
      libraryTarget: 'umd'
    },
    module: jsModuleConfig,
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            drop_console: true
          },
          mangle: true,
          beautify: false,
          preserveComments: false
      })
    ]
  },
  {
    name: 'swiftclick-example',
    entry: swiftclickEntryFile,
    target: 'web',
    output: {
      path: path.join(__dirname, 'example/js/libs'),
      filename: 'swiftclick.js',
      library: 'SwiftClick',
      libraryTarget: 'umd'
    },
    module: jsModuleConfig,
    devtool: 'source-map',
    devServer: {
      inline: true,
      hot: true,
      contentBase: './example/'
    }
  },
];
