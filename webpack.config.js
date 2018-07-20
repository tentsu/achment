const path = require('path');

module.exports = {
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax=1',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: path.resolve(__dirname, './css/main.scss'), // for example
                  },
                },
              ],
              scss: [
                'vue-style-loader',
                'css-loader',
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: path.resolve(__dirname, './css/main.scss'), // for example
                  },
                },
              ],
            },
          },
        },
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
}
