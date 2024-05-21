import esRequest from '../../../utils/esRequest';

Page({
  data: {
    userPhone: '',
    verificationCode: '',
    carNumber: '',
    driverLicenseCode: '',
    driverLicense01: '',
    driverLicense02: '',
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

  // 车牌号 - input
  carNumberInput: function (e) {
    this.setData({
      carNumber: e.detail.value
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

  // 选择文件
  chooseFiles: function (e) {
    this.data.driverLicenseCode = e.currentTarget.dataset.code
    let _this = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back', // 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头
      success(res) {
        _this.uploadFiles(res.tempFiles)
      }
    })
  },
  // 上传文件
  uploadFiles: async function (files) {
    files.forEach(async (item) => {
      try {
        let resImg = await this.blockingUploadFiles(item.tempFilePath)
        if (this.data.driverLicenseCode === '01') {
          this.setData({
            driverLicense01: resImg,
          })
        }
        if (this.data.driverLicenseCode === '02') {
          this.setData({
            driverLicense02: resImg,
          })
        }
      } catch (error) {
        wx.showToast({
          title: '文件上传失败',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  // 闭包上传
  blockingUploadFiles: function (tempFilePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${baseURL}/resource/oss/upload/xcx`,
        filePath: tempFilePath,
        name: 'file',
        header: {
          Authorization: `Bearer ${wx.getStorageSync('token')}`
        },
        success(res) {
          console.log(res);
          const data = JSON.parse(res.data)
          if (data.code === 200) {
            resolve(JSON.parse(res.data))
          } else {
            reject(new Error('upload failed'))
          }
        },
        fail() {
          reject(new Error('upload failed'))
        }
      })
    })
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