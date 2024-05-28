import {
  loginCheck
} from '../../utils/util'
import esRequest from '../../utils/esRequest';

Page({
  data: {
    isLogin: false,
  },

  onLoad() {
    esRequest('profile').then(res => {
      console.log(res);
    })
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