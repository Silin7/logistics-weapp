import {
  baseURL,
} from "../../../utils/baseURL.js";
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    userPhone: '',
    verificationCode: '',
    verificationCode2: '',
    numberplate: '',
    name: '',
    driverLicenseCode: '',
    license_page: '',
    license_subpage: '',
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

  // 姓名 - input
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
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
    // let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    // if (!phoneReg.test(this.data.userPhone)) {
    //   wx.showToast({
    //     title: '手机号格式错误',
    //     icon: 'none'
    //   })
    //   return
    // }
    wx.showLoading({
      title: '加载中',
    })
    this.countdownChange()
    esRequest('getphonecode', {
      phone: this.data.userPhone
    }).then((res) => {
      this.setData({
        verificationCode: res.data.code,
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

  // 验证码 - input
  verificationInput: function (e) {
    this.setData({
      verificationCode2: e.detail.value
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

  // 车牌号 - input
  carNumberInput: function (e) {
    this.setData({
      numberplate: e.detail.value
    })
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
      success: function (res) {
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
            license_page: resImg.data.url,
          })
        }
        if (this.data.driverLicenseCode === '02') {
          this.setData({
            license_subpage: resImg.data.url,
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
        url: `${baseURL}/uploadimgtoreg`,
        filePath: tempFilePath,
        name: 'filepath',
        header: {
          Authorization: `Bearer ${wx.getStorageSync('token')}`
        },
        success: function (res) {
          const data = JSON.parse(res.data)
          if (data.status) {
            resolve(JSON.parse(res.data))
          } else {
            reject(new Error('upload failed'))
          }
        },
        fail: function (error) {
          console.log('error', error);
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
    // let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    // if (!phoneReg.test(this.data.userPhone)) {
    //   wx.showToast({
    //     title: '手机号格式错误',
    //     icon: 'none'
    //   })
    //   return
    // }
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return
    }
    if (!this.data.verificationCode2) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return
    }
    if (this.data.verificationCode2 != this.data.verificationCode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none'
      });
      return
    }
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
    if (!this.data.license_page) {
      wx.showToast({
        title: '请输入驾驶证正本',
        icon: 'none'
      });
      return
    }
    if (!this.data.license_subpage) {
      wx.showToast({
        title: '请输入驾驶证副页',
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
    esRequest('driverregister', {
      open_id: wx.getStorageSync('open_id'),
      phone: this.data.userPhone,
      name: this.data.name,
      numberplate: this.data.numberplate,
      license_page: this.data.license_page,
      license_subpage: this.data.license_subpage,
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