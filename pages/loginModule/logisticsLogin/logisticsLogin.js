import {
  baseURL,
} from "../../../utils/baseURL.js";
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    userPhone: '',
    numberplate: '',
    name: '',
    driverLicenseCode: '',
    license_page: '',
    license_subpage: '',
  },

  onLoad: function () {

  },

  onShow: function () {

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

  // 姓名 - input
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
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
        title: '请获取手机号',
        icon: 'none'
      });
      return
    }
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return
    }
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