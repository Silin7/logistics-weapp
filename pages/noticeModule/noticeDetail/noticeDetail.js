import esRequest from '../../../utils/esRequest';
Page({
  data: {
    id: '',
    noticeForm: {}
  },

  onLoad: function (option) {
    this.setData({
      id: option.id
    })
    this.getInfo()
  },

  // 文章详细
  getInfo: function () {
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    esRequest('article', '', this.data.id).then(res => {
      console.log(res.data.data);
      this.data.noticeForm = res.data.data
      this.data.noticeForm.contents = this.data.noticeForm.contents.replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
      this.setData({
        noticeForm: this.data.noticeForm
      })
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.msg,
        icon: 'none'
      })
    })
  }
})