import esRequest from '../../../utils/esRequest';

Page({
  data: {
    triggered: true,
    reachTimer: null,
    total: 0,
    currentPage: 1,
    noticeData: []
  },

  onLoad: function () {
    this.initFunction()
  },

  // 初始化函数
  initFunction: function () {
    this.setData({
      total: 0,
      currentPage: 1,
      noticeData: [],
    })
    this.getDataList()
  },

  // 公告列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('articlelist', {
      page: this.data.currentPage,
    }).then(res => {
      this.data.noticeData = this.data.noticeData.concat(res.data.data)
      this.setData({
        total: res.data.total,
        noticeData: this.data.noticeData
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

  // 页面跳转 - 公告详情
  goNoticeDetail: function (e) {
    wx.navigateTo({
      url: '/pages/noticeModule/noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.item.id,
    })
  },

  // 自定义下拉刷新被触发
  permessagerePull: function () {
    this.setData({
      triggered: true,
    })
    this.initFunction()
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
    }, 1000)
  },

  // 滚动到底部
  onScrollBottom: function () {
    let _this = this
    clearTimeout(this.data.reachTimer)
    this.data.reachTimer = setTimeout(function () {
      if (_this.data.noticeData.length < _this.data.total) {
        _this.data.currentPage += 1
        _this.getDataList()
      }
    }, 1000)
  },

})