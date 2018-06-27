const { NodeEnvironmentPlugin, WatchIgnorePlugin } = require('webpack');
const path = require('path');
module.exports = {
  entry: {
    index: path.resolve('./src/index.ts'),
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              localIdentName: '[local]__[hash:base64:5]',
              modules: true,
              sass: false,
              namedExport: true,
              sourcemaps:true,
              banner: '// This is a generated file. Changes are likely to result in being overwritten'
            }
          },
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(tsx?)|(jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel'],
            },
          },
          'awesome-typescript-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        options: { /* Loader options go here */ }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [ 'file-loader' ]
      },
    ]
  },

  externals: {
    react: 'umd react',
    'react-dom' : 'umd react-dom'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.scss']
  },

  output: {
    path: path.resolve('./built'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: "[name]",
  },

  plugins: [
    new NodeEnvironmentPlugin(),
    new WatchIgnorePlugin([
      './src/**/*.d.ts'
    ])
  ]
};
