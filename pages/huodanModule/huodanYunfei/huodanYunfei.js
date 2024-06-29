import esRequest from '../../../utils/esRequest';

Page({
  data: {
    dataList: [],
  },
  
  onShow: function () {
    this.getDataList()
  },

  // 货单列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('mylogistics').then(res => {
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
})