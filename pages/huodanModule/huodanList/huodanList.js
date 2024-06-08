import esRequest from '../../../utils/esRequest';

Page({
  data: {
    dataList: []
  },

  onLoad: function () {
    this.getDataList()
  },

  // 货单列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('deliverylist').then(res => {
      console.log(res.data.data);
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
  goNoticeDetail: function (e) {
    // wx.navigateTo({
    //   url: '/pages/noticeModule/noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.item.id,
    // })
  },

  // 页面跳转 - 签字确认
  goSignConfirm: function (e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/signModule/driverSign/driverSign?id=${item.id}&t_company_name=${item.t_company_name}`
    })
  }

})