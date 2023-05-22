const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    modules: [__dirname, 'src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.png', 'svg'],
    alias: {
      '@common-types': path.resolve(__dirname, './src/common-types'),
      '@components/atoms': path.resolve(__dirname, './src/components/atoms'),
      '@components/molecules': path.resolve(__dirname, './src/components/molecules'),
      '@components/organisms': path.resolve(__dirname, './src/components/organisms'),
      '@components/templates': path.resolve(__dirname, './src/components/templates'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@icons': path.resolve(__dirname, './src/shared/assets/icons'),
      '@styles': path.resolve(__dirname, './src/shared/styles'),
      '@store': path.resolve(__dirname, './src/store/slices')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { url: false } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['ie >= 8', 'last 8 version']
                  })
                ]
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['ie >= 8', 'last 8 version']
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/')
    },
    historyApiFallback: true,
    port: 8080
  }
};
