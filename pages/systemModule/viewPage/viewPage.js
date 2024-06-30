Page({
  data: {
    viewInfo: {},
  },

  onShow: function () {
    const viewInfo = wx.getStorageSync('viewInfo')
    viewInfo.images = JSON.parse(viewInfo.images)
    this.setData({
      viewInfo
    })
  },

  // 查看大图
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.item,
      urls: this.data.viewInfo.images
    })
  },

})