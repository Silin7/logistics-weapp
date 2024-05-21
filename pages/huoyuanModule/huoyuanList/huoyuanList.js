Page({
  data: {
    triggered: true,
    reachTimer: null,
    total: 0,
    currentPage: 1,
    dataList: [{
      startPlace: '山东 聊城',
      endPlace: '杭州 富阳',
      gxDate: '10:56',
      zhDate: '9月15日上午10：00装货',
      goods: '可口可乐',
      weight: '40吨',
      distance: '1200'
    }, {
      startPlace: '山东 聊城',
      endPlace: '杭州 富阳',
      gxDate: '10:56',
      zhDate: '9月15日上午10：00装货',
      goods: '可口可乐',
      weight: '40吨',
      distance: '1200'
    }, {
      startPlace: '山东 聊城',
      endPlace: '杭州 富阳',
      gxDate: '10:56',
      zhDate: '9月15日上午10：00装货',
      goods: '可口可乐',
      weight: '40吨',
      distance: '1200'
    }]
  },

  onLoad: function () {
    // this.initFunction()
  },

  // 初始化函数
  initFunction: function () {
    this.setData({
      total: 0,
      currentPage: 1,
      dataList: [],
    })
    this.getDataList()
  },

  // 公告列表
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('systemPosts', {
      page: this.data.currentPage,
    }).then(res => {
      this.data.dataList = this.data.dataList.concat(res.data.data.items)
      this.setData({
        total: res.data.data.total,
        dataList: this.data.dataList
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
      if (_this.data.dataList.length < _this.data.total) {
        _this.data.currentPage += 1
        _this.getDataList()
      }
    }, 1000)
  },

})