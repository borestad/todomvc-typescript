import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

// tslint:disable-next-line:no-default-export
export default {
  entry: {
    'todomvc': './src/app.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'TodoMVC',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    alias: {
      '@src': path.join(__dirname, 'src')
    }
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.html`,
      inject: 'body',
      files: {
        js: ['playui.js']
      }
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   include: /\.min\.js$/
    // })
  ],
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        declaration: false
      }
    }]
  }
}
