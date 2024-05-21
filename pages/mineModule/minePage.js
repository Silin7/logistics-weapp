import {
  loginCheck
} from '../../utils/util'

Page({
  data: {
    isLogin: false,
  },

  onLoad() {

  },

  onShow: function () {
    this.setData({
      isLogin: loginCheck()
    })
    // if (this.data.isLogin) {
    //   this.setData({
    //     userInfo: wx.getStorageSync('userInfo')
    //   })
    // }
  },
})