import {
  baseURL,
} from "../../../utils/baseURL.js";
import esRequest from '../../../utils/esRequest';

Page({
  data: {
    voucher_id: '',
    images: [],
  },

  onLoad: function (options) {
    this.setData({
      voucher_id: options.voucher_id
    })
  },

  // 选择文件
  chooseFiles: function () {
    let _this = this
    wx.chooseMedia({
      count: 4,
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
    let _this = this
    files.forEach(async (item) => {
      console.log(item.tempFilePath);
      try {
        let resImg = await _this.blockingUploadFiles(item.tempFilePath)
        _this.data.images.push(resImg.data.url)
        _this.setData({
          images: _this.data.images,
        })
        console.log('_this.data.images', _this.data.images);
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
        url: `${baseURL}/uploadimg`,
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

  // 删除图片
  deleteImg: function (e) {
    let index = e.currentTarget.dataset.index
    this.data.images.splice(index, 1)
    this.setData({
      images: this.data.images
    })
  },

  // 图片预览
  previewImage: function (e) {
    wx.previewImage({
      current: baseURL + e.currentTarget.dataset.url,
      urls: this.data.images
    })
  },

  // 保存
  saveFunction: function () {
    if (this.data.images.length > 4) {
      wx.showToast({
        title: '最多上传4张图片',
        icon: 'none',
      })
      return
    }
    wx.showLoading({
      title: '加载中',
    })
    esRequest('deliverySaveimgs', {
      images: this.data.images,
      voucher_id: this.data.voucher_id
    }).then(res => {
      console.log(res);
      wx.hideLoading();
      wx.showToast({
        title: '操作成功',
        icon: 'none',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 200)
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
    })
  }
})