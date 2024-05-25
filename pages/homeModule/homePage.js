import esRequest from '../../utils/esRequest';

Page({
  data: {
    swiperCurrent: 0,
    noticeData: [],
    portalForm: {},
  },

  onLoad: function () {
    this.getPortal()
  },

  // 首页数据
  getPortal: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('portal').then(res => {
      this.setData({
        portalForm: res.data
      })
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  },

  // 切换banner
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current,
    })
  },

  // 页面跳转 - 客户端
  goLoginKhd: function () {
    // wx.navigateTo({
    //   url: '',
    // })
  },

  // 页面跳转 - 物流端
  goLoginWld: function () {
    // wx.navigateTo({
    //   url: '',
    // })
  },

  // 页面跳转 - 公告列表
  goNoticeList: function () {
    // wx.navigateTo({
    //   url: '/pages/noticeModule/noticeList/noticeList?id=' + e.currentTarget.dataset.item.id,
    // })
  },

  // 页面跳转 - 公告详情
  goNoticeDetail: function (e) {
    // wx.navigateTo({
    //   url: '/pages/noticeModule/noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.item.id,
    // })
  },
})