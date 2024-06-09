import {
  loginCheck
} from '../../utils/util'
import esRequest from '../../utils/esRequest';

Page({
  data: {
    isLogin: false,
    profile: {},
  },

  onShow: function () {
    this.setData({
      isLogin: loginCheck(),
    })
    if (this.data.isLogin) {
      this.getProfile()
    }
  },

  // 用户须知
  goPagecontent: function () {
    wx.navigateTo({
      url: '/pages/noticeModule/pagecontent/pagecontent?code=protocol&title=用户须知',
    })
  },

  // 点击登录
  goLogin: function () {
    wx.showActionSheet({
      itemList: ['我是采购客户', '我是物流司机'],
      success: function (res) {
        // 采购客户
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '/pages/loginModule/purchaseLogin/purchaseLogin',
          })
        }
        // 物流司机
        if (res.tapIndex === 1) {
          wx.navigateTo({
            url: '/pages/loginModule/logisticsLogin/logisticsLogin',
          })
        }
      },
      fail: function (res) {
        console.log('用户点击取消', res.errMsg)
      }
    })
  },

  // 用户登录后获取用户的相关资料
  getProfile: function () {
    wx.showLoading({
      title: '加载中',
    })
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
  },

  // 待签合同
  goHetong: function () {
    wx.navigateTo({
      url: '/pages/hetongModule/hetongList/hetongList',
    })
  },

  // 我的货单
  goHuodan: function () {
    wx.navigateTo({
      url: '/pages/huodanModule/huodanList/huodanList',
    })
  },
})