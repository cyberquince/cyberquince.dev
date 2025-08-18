const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '../dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://cyberquince.dev/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/ip': {
        target: 'https://api.country.is/',
        changeOrigin: true,
        pathRewrite: { '^/ip': '' },
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
