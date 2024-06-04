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
            wx.setStorageSync('token', res.data.token)
            wx.setStorageSync('profile', res.data.profile)
            if (res.data.profile) {
              wx.setStorageSync('open_id', res.data.profile.open_id)
            }
          }).catch((error) => {
            if (error.data && error.data.token) {
              wx.setStorageSync('registered', error.data.registered)
              wx.setStorageSync('open_id', error.data.open_id)
              wx.setStorageSync('session_key', error.data.session_key)
              wx.setStorageSync('token', error.data.token)
            }
          })
        }
      }
    })
  }
})