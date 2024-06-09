import esRequest from '../../../utils/esRequest';

Page({
  data: {
    pageType: '',
    pageId: '',
    webUrl: '',
    tplusdelivery_id: '',
    linkMan: '',
    t_company_name: '',
    signed: '',
  },

  onLoad: function (options) {
    this.setData({
      pageType: options.pageType,
      pageId: options.pageId,
      webUrl: options.webUrl,
      tplusdelivery_id: options.tplusdelivery_id || '',
      linkMan: options.linkMan || '',
      t_company_name: options.t_company_name,
    })
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
    esRequest('voucherhavesigned', '', this.data.pageId).then(res => {
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
    esRequest('deliveryhavesigned', '', this.data.tplusdelivery_id).then(res => {
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
    wx.redirectTo({
      url: `/pages/signModule/signPage/signPage?pageType=${this.data.pageType}&pageId=${this.data.pageId}&linkMan=${this.data.linkMan}&t_company_name=${this.data.t_company_name}`,
    })
  },

  // 回到首页
  goHomePage: function () {
    wx.switchTab({
      url: '/pages/homeModule/homePage',
    })
  }

})