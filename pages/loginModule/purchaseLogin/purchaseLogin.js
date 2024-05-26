import esRequest from '../../../utils/esRequest';

Page({
  data: {
    userPhone: '',
    codeFlag: null,
    verificationCode: '',
    verificationTimer: null,
    countdown: 60,
    companyName: '',
  },

  // 手机号 - input
  userPhoneInput: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },

  // 获取手机验证码（企业负责人）
  getcompanyphonecodeFunction: function () {
    if (!this.data.userPhone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(this.data.userPhone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    this.countdownChange()
    esRequest('getcompanyphonecode', {
      phone: this.data.userPhone
    }).then((res) => {
      this.setData({
        codeFlag: true,
        verificationCode: res.data.code,
        companyName: res.data.director.company.name
      })
      wx.hideLoading()
    }).catch((err) => {
      this.setData({
        codeFlag: false,
      })
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
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

  // // 验证码 - input
  // verificationInput: function (e) {
  //   this.setData({
  //     verificationCode: e.detail.value
  //   })
  // },

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
    esRequest('directorregister', {
      open_id: wx.getStorageSync('open_id'),
      phone: this.data.userPhone,
    }).then(res => {
      if (res.code === 401) {
        this.submitRequest()
        return
      }
      console.log('directorregister------->', res);
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