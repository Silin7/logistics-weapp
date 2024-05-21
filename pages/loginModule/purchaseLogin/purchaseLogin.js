import esRequest from '../../../utils/esRequest';

Page({
  data: {
    userPhone: '',
    verificationCode: '',
    verificationTimer: null,
    countdown: 60,
  },

  onLoad: function () {

  },

  onShow: function () {

  },

  // 手机号 - input
  userPhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },

  // 验证码 - input
  verificationInput: function (e) {
    this.setData({
      verificationCode: e.detail.value
    })
  },

  // 验证码倒计时
  countdownChange: function () {
    this.data.verificationTimer = setInterval(() => {
      this.data.countdown -= 1
      this.setData({
        countdown: this.data.countdown
      })
      // 清除定时器
      if (this.data.countdown === 0) {
        clearInterval(this.data.verificationTimer)
      }
    }, 1000)
  },

  // 提交按钮 - 弹出
  submitFunction: function () {
    let _this = this
    if (!this.data.userPhone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return
    }
    if (!this.data.verificationCode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return
    }
    wx.showModal({
      title: '提交',
      content: '确定要提交保存数据吗？',
      success(res) {
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
    esRequest('xxx', {
    userPhone: this.data.userPhone,
    verificationCode: this.data.verificationCode,
    }).then(res => {
      if (res.code === 401) {
        this.submitRequest()
        return
      }
      wx.hideLoading()
      wx.showToast({
        title: '登录成功'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/homeModule/homePage',
        })
      }, 200)
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.msg,
        icon: 'none'
      })
    })
  },
})