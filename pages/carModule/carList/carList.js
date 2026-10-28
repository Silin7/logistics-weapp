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
    let numberplate = (this.data.numberplate || '').trim().toUpperCase()
    if (!numberplate) {
      wx.showToast({
        title: '请输入车牌号',
        icon: 'none'
      });
      return
    }
    // 车牌号校验正则：支持普通汽车(含挂车/教练车/警车/港澳车/领馆车等7位)、新能源汽车(8位)、使馆车、武警车、军车、应急救援车等
    let carNumReg = /^(([京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新][A-Z](([A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳领])|([A-HJ-NP-Z0-9]{6})))|使[0-9]{6}|WJ[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]?[A-HJ-NP-Z0-9]{5,7}|[A-Z]{2}[0-9]{5}|([京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]?[A-HJ-NP-Z0-9]{4,6}应急|应急[A-HJ-NP-Z0-9]{4,6}))$/i
    if (!carNumReg.test(numberplate)) {
      wx.showToast({
        title: '车牌号格式错误',
        icon: 'none'
      })
      return
    }
    this.setData({
      numberplate: numberplate
    })
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