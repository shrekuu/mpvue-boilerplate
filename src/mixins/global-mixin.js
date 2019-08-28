// 全局 mixin 每个页面上
export default {

  methods: {
    showLoading (message = '正在加载...') {
      this.hideToast()
      wx.showLoading({
        title: message,
        mask: true,
      })
    },

    hideLoading () {
      try {wx.stopPullDownRefresh() } catch (e) {}
      wx.hideLoading()
      wx.hideToast()
    },

    // 跟 hideLoading 一样
    hideToast () {
      this.hideLoading()
    },

    showToast (message, duration = 2000, callback = null) {
      this.hideLoading()
      wx.showToast({
        title: message,
        icon: 'none',
        duration,
      })

      if (callback) {
        setTimeout(callback, duration)
      }
    },

    /**
     *显示错误信息, 等 2 秒后返回上一页
     *
     * @param message
     * @param duration number
     */
    showToastThenNavBack (message, duration = 2000) {
      const navigateBack = () => {
        try {
          wx.navigateBack({
            delta: 1,
          })
        } catch (e) {
          console.error('e', e)
        }
      }

      this.showToast(message, duration, navigateBack)
    }
  }
}
