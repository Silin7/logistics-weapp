import esRequest from '../../../utils/esRequest';

Page({

  data: {
    content: '',
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    // 用户须知 protocol 联系方式 contacts 系统介绍 about 荣程简介 rongcheng
    wx.showLoading({
      title: '加载中',
    })
    esRequest('pagecontent', {
      thetag: options.code
    }).then(res => {
      wx.hideLoading()
      this.setData({
        content: res.data.data.content
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  },
})