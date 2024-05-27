import esRequest from './utils/esRequest';

App({
  onLaunch: function () {
    // 获取open_id和session_key
    wx.login({
      success: (res) => {
        if (res.code) {
          esRequest('wxLogin', {
            code: res.code,
          }).then(res => {
            wx.setStorageSync('registered', res.data.registered)
            wx.setStorageSync('open_id', res.data.profile.open_id)
            wx.setStorageSync('token', res.data.token)
          }).catch((error) => {
            if (!error.status && error.data.token) {
              wx.setStorageSync('registered', res.data.registered)
              wx.setStorageSync('open_id', res.data.open_id)
              wx.setStorageSync('session_key', res.data.session_key)
              wx.setStorageSync('token', res.data.token)
            }
          })
        }
      }
    })
  }
})