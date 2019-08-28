import environment from './environment'

// 用环境前缀区分开存储键, 这样测试时就不用删除生产环境版小程序
const storage = {

  // api token
  api_token: `${environment.storage_prefix}api_token`,

  // 用户
  user: `${environment.storage_prefix}user`,

  get (key) {
    return wx.getStorageSync(key)
  },
  set (key, value) {
    return wx.setStorageSync(key, value)
  },
  remove (key) {
    return wx.removeStorageSync(key)
  },
  clear () {
    return wx.clearStorageSync()
  },
}

export default storage
