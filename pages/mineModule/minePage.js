// import {
//   loginCheck
// } from '../../utils/util'
import esRequest from '../../utils/esRequest';

Page({
  data: {
    isLogin: false,
    profile: {},
  },

  onShow: function () {
    // this.setData({
    //   isLogin: loginCheck(),
    // })
    this.getProfile()
  },

  // 用户登录后获取用户的相关资料
  getProfile: function () {
    esRequest('profile').then(res => {
      this.setData({
        profile: res.data.profile
      })
      wx.setStorageSync('profile', res.data.profile)
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  }
})