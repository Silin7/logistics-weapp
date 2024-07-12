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

  // 页面跳转 - 上传图片
  goUploadPage: function (e) {
    let item = e.currentTarget.dataset.item
    let type = e.currentTarget.dataset.type
    wx.setStorageSync('viewInfo', item)
    wx.navigateTo({
      url: `/pages/systemModule/uploadPage/uploadPage?voucher_id=${item.id}&type=${type}`,
    })
  },

  // 页面跳转 - 查看图片
  goViewPage: function (e) {
    let item = e.currentTarget.dataset.item
    wx.setStorageSync('viewInfo', item)
    wx.navigateTo({
      url: '/pages/systemModule/viewPage/viewPage',
    })
  },

  // 页面跳转 - 详细
  goDeliveryhavesigned: function (e) {
    let item = e.currentTarget.dataset.item
    wx.setStorageSync('huodan', item)
    wx.navigateTo({
      url: `/pages/webModule/webView/webView?pageType=huodan&webUrl=${item.orderurl}`,
    })
  },

  // // 页面跳转 - 签字确认
  // goSignConfirm: function (e) {
  //   const item = e.currentTarget.dataset.item
  //   wx.navigateTo({
  //     url: `/pages/signModule/driverSign/driverSign?id=${item.id}&t_company_name=${item.t_company_name}&tplusdelivery_id=${item.tplusdelivery_id}&webUrl=${item.orderurl}`
  //   })
  // }

})