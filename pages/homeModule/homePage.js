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
    if (!wx.getStorageSync('registered')) {
      wx.navigateTo({
        url: '/pages/loginModule/purchaseLogin/purchaseLogin',
      })
    } else {
      let profile = wx.getStorageSync('profile')
      if (profile.role && profile.role === 2) {
        wx.navigateTo({
          url: '/pages/hetongModule/hetongList/hetongList',
        })
      } else {
        wx.showToast({
          title: '暂无权限',
          icon: 'none'
        })
      }
    }
  },

  // 页面跳转 - 物流端
  goLoginWld: function () {
    if (!wx.getStorageSync('registered')) {
      wx.navigateTo({
        url: '/pages/loginModule/logisticsLogin/logisticsLogin',
      })
    } else {
      let profile = wx.getStorageSync('profile')
      if (profile.role && profile.role === 1) {
        wx.navigateTo({
          url: '/pages/huodanModule/huodanList/huodanList',
        })
      } else {
        wx.showToast({
          title: '暂无权限',
          icon: 'none'
        })
      }
    }
  },

  // // 页面跳转 - 合同列表
  // goHetongList: function () {
  //   wx.navigateTo({
  //     url: '/pages/hetongModule/hetongList/hetongList',
  //   })
  // },

  // 页面跳转 - 公告列表
  goNoticeList: function () {
    wx.navigateTo({
      url: '/pages/noticeModule/noticeList/noticeList',
    })
  },

  // 页面跳转 - 公告详情
  goNoticeDetail: function (e) {
    wx.navigateTo({
      url: '/pages/noticeModule/noticeDetail/noticeDetail?id=' + e.currentTarget.dataset.item.id,
    })
  },
})