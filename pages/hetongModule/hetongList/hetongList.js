import esRequest from '../../../utils/esRequest';

Page({
  data: {
    dataList: []
  },

  onShow: function () {
    this.getDataList()
  },

  // 公告列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('voucherlist').then(res => {
      console.log(res.data.data);
      this.setData({
        dataList: res.data.data
      })
      wx.hideLoading();
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.msg,
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
})