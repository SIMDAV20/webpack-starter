const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin'); // para las imagenes
const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    clean: true, // vuelve a crear el dist
    path: path.resolve(process.cwd(), 'dist'), // path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        exclude: /styles.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      { // no es necesario por el html-webpack-plugin ya lo hace
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false, // en caso que buena un archivo, como un img. tmb lo mueve, crea un hash
          minimize: false, // true para q lo reduzca
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebPackPlugin({
      title: 'Mi Webpack App', // puedo controlar el title de mi html
      filename: 'index.html',
      template: './src/index.html',
      // path.resolve(__dirname, "src", "index.html"),
      // // tengo que decirle cual hmtl y como quiero q salga en el buii
      // minify: {
      //   collapseWhitespace: true,
      //   keepClosingSlash: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true
      // }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css', // para que no mantenga en cache el mismo estilo
      // filename: '[name].css',
      // filename: 'nuevo-estilo.css', // para prod
      ignoreOrder: false,
    }),
    new CopyPlugin({ // copia las img y las mueve al build
      patterns: [
        { from: 'src/assets/img', to: 'assets' }
      ]
    }),
  ]
}