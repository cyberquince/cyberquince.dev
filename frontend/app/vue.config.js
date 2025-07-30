const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../dist',
  publicPath:  process.env.NODE_ENV === "production" ? "/cyberquince.dev/" : "/",
  devServer: {
    proxy: {
      '/api': {
        target: 'http://dev.flask.home:41300/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      }),
    ],
  }
});
