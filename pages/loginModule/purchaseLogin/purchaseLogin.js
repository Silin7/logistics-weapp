import esRequest from '../../../utils/esRequest';

Page({
  data: {
    userPhone: '',
  },

  // 微信手机号快速验证
  getPhoneNumber: function (e) {
    console.log('e', e);
    if (e.detail.errMsg !== 'getPhoneNumber:ok' || !e.detail.code) {
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    esRequest('getuserphonenumber', {
      code: e.detail.code
    }).then((res) => {
      const phoneInfo = res.data.phone_info || {}
      const userPhone = res.data.phone || phoneInfo.phoneNumber || phoneInfo.purePhoneNumber || ''
      if (!userPhone) {
        wx.hideLoading()
        wx.showToast({
          title: '获取手机号失败',
          icon: 'none'
        })
        return
      }
      this.setData({
        userPhone
      })
      wx.hideLoading()
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message || '获取手机号失败',
        icon: 'none'
      })
    })
  },

  // 提交按钮 - 弹出
  submitFunction: function () {
    let _this = this
    if (!this.data.userPhone) {
      wx.showToast({
        title: '请获取手机号',
        icon: 'none'
      });
      return
    }
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
    esRequest('directorregister', {
      open_id: wx.getStorageSync('open_id'),
      phone: this.data.userPhone,
    }).then(res => {
      wx.setStorageSync('registered', true)
      wx.setStorageSync('token', res.data.token)
      if (res.data.profile) {
        wx.setStorageSync('profile', res.data.profile)
        wx.setStorageSync('open_id', res.data.profile.open_id)
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
        title: err.message,
        icon: 'none'
      })
    })
  },
})