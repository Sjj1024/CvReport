const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // publicPath: process.env.NODE_ENV === 'production' ? '/CvReport/' : '/',  // 发布项目到gitpage上的配置
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',  // 发布项目到自己服务器上的配置
  devServer: {
    proxy: {
      //跨域代理
      '/dataset': {
        target: 'http://172.20.8.110:31000/fedx-api/workflow/federalMlTypeList',
        ws: true,
        secure: false,
        changeOrigin: true, //是否开启跨域
        pathRewrite: {
          '^/dataset': '', //让路径以/api开头的字段为空
        },
      },
    },
  },
})
