import esRequest from '../../../utils/esRequest';

Page({
  data: {
    dataList: []
  },

  onShow: function () {
    this.getDataList()
  },

  // 货单列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('deliverylist').then(res => {
      this.setData({
        dataList: res.data.data
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

  // 页面跳转 - 详细
  goDeliveryhavesigned: function (e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/webModule/webView/webView?pageType=huodan&pageId=${item.id}&webUrl=${item.orderurl}&tplusdelivery_id=${item.tplusdelivery_id}&t_company_name=${item.t_company_name}`,
    })
  },

  // 页面跳转 - 签字确认
  goSignConfirm: function (e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/signModule/driverSign/driverSign?id=${item.id}&t_company_name=${item.t_company_name}&tplusdelivery_id=${item.tplusdelivery_id}&webUrl=${item.orderurl}`
    })
  }

})