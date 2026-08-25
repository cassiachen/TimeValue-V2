// app.js — 时值 TimeValue
App({
  globalData: {
    // 用户设置（首次从 storage 读取，设置页写入后同步更新）
    settings: null
  },

  onLaunch() {
    // 读取本地存储的设置
    const settings = wx.getStorageSync('settings')
    if (settings) {
      this.globalData.settings = settings
    }
  }
})
