import esRequest from '../../utils/esRequest';

Page({
  data: {
    swiperList: ['https://www.silin7.cn/WULIU/home0.png', 'https://www.silin7.cn/WULIU/home0.png', 'https://www.silin7.cn/WULIU/home0.png'],
    swiperCurrent: 0,
    noticeData: []
  },

  onLoad: function () {},

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

  // 信息公示 - 列表
  getDataFunction: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('apiName', ).then(res => {
      if (res.code === 401) {
        this.getDataFunction()
        return
      }
      this.setData({
        noticeData: res.data
      })
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.msg,
        icon: 'none'
      })
    })
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