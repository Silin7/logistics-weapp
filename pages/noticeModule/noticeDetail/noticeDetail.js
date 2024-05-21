import esRequest from '../../../utils/esRequest';
Page({
  data: {
    noticeForm: {
      title: '关注公众号，乘车有优惠!',
      username: '平台管理员',
      createTime: '2024-05-12',
      content: '最近它又更新了一键海淘的功能，支持国外主流购物网站，就算你没有双币信用卡，没有国外账号 左手交易手续',
    }
  },

  onLoad: function (option) {
    // let id = option.id + '/xcx'
    // this.getInfo(id)
  },

  getInfo: function (id) {
    wx.showLoading({
      title: '加载中',
      icon: 'none'
    })
    esRequest('article', '', id).then(res => {
      this.data.noticeForm = res.data
      this.data.noticeForm.content = this.data.noticeForm.content.replace(/\<img/gi, '<img style="max-width:100%; height:auto"')
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