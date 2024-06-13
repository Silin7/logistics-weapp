import esRequest from '../../../utils/esRequest';

Page({

  data: {
    profile: {},
    dataList: [],
    pshow: false,
    numberplate: '',
  },

  onShow: function () {
    this.setData({
      profile: wx.getStorageSync('profile')
    })
    this.getDataList()
  },

  // 获取司机用户的车牌号
  getDataList: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('getnumberplate').then(res => {
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

  // 弹框 - 弹出
  showPopup: function () {
    this.setData({
      pshow: true
    });
  },

  // 弹框 - 关闭
  showClose: function () {
    this.setData({
      pshow: false
    });
  },

  // numberplate input
  numberplateInput: function (e) {
    this.setData({
      numberplate: e.detail.value
    })
  },

  // 弹框 - 确定
  addnumberplateFunc: function () {
    if (!this.data.numberplate) {
      wx.showToast({
        title: '请输入车牌号',
        icon: 'none'
      });
      return
    }
    let carNumReg = /^[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[ABCDEFGHJKLMNOPQRSTUVWXY]{1}[0-9A-Z]{5}$/u
    if (!carNumReg.test(this.data.numberplate)) {
      wx.showToast({
        title: '车牌号格式错误',
        icon: 'none'
      })
      return
    }
    let _this = this
    wx.showModal({
      title: '提交',
      content: '确定要提交保存数据吗？',
      success: function (res) {
        if (res.confirm) {
          _this.submitRequest()
        }
      }
    })

  },

  // 提交
  submitRequest: function () {
    wx.showLoading({
      title: '加载中',
    })
    esRequest('addnumberplate', {
      numberplate: this.data.numberplate
    }).then(() => {
    this.getDataList()
    this.showClose()
      wx.hideLoading()
      wx.showToast({
        title: '登录成功'
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  }


})