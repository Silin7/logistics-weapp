import esRequest from '../../../utils/esRequest';

Page({
  data: {
    pageType: '',
    webUrl: '',
    signed: '',
  },

  onLoad: function (options) {
    this.setData({
      pageType: options.pageType,
      webUrl: options.webUrl,
    })
  },

  onShow: function () {
    if (this.data.pageType === 'hetong') {
      this.getVoucherhavesigned()
    }
    if (this.data.pageType === 'huodan') {
      this.getDeliveryhavesigned()
    }
  },

  // 判断合同是否签字
  getVoucherhavesigned: function () {
    wx.showLoading({
      title: '加载中',
    })
    let hetong = wx.getStorageSync('hetong')
    esRequest('voucherhavesigned', '', hetong.id).then(res => {
      this.setData({
        signed: res.data.data.signed
      })
      wx.hideLoading();
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  },

  // 判断货单是否签字
  getDeliveryhavesigned: function () {
    wx.showLoading({
      title: '加载中',
    })
    let huodan = wx.getStorageSync('huodan')
    esRequest('deliveryhavesigned', '', huodan.tplusdelivery_id).then(res => {
      this.setData({
        signed: res.data.data.signed
      })
      wx.hideLoading();
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  },

  // 去签字
  goSignPage: function () {
    wx.navigateTo({
      url: `/pages/signModule/signPage/signPage?pageType=${this.data.pageType}`,
    })
  },

  // 回到首页
  goHomePage: function () {
    wx.switchTab({
      url: '/pages/homeModule/homePage',
    })
  }

})