// 生产服务器
const production = {
  version: '1.0.0',
  production: true,

  // 后端服务, @todo 换成你们的
  api_base_url: 'https://jsonplaceholder.typicode.com',

  // 图片对象存储
  cos_end_point: 'https://mina-1252139118.coscd.myqcloud.com/mpvue-boilerplate',

  // 小程序数据存储前缀
  storage_prefix: 'production_',
}

// 线上测试服务器
const staging = Object.assign({}, production, {
  production: false,

  // 后端服务
  api_base_url: 'https://jsonplaceholder.typicode.com',

  // 小程序数据存储前缀
  storage_prefix: 'staging_',
})

// 本地测试服务器
const development = Object.assign({}, staging, {

  // 后端服务
  api_base_url: 'https://jsonplaceholder.typicode.com',
})

// 环境切换, production 或 staging 或 development
// 打包时修改为 production, 仓库始始终保持为 staging
const environment = staging

export default environment
