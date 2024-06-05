import {
  baseURL
} from '../../../utils/baseURL'
// import esRequest from "../../../utils/esRequest"

Page({
  data: {
    id: '',
    linkMan: '',
    t_company_name: '',
    sign_tmp_file: '',
  },

  onLoad: function (options) {
    this.setData({
      id: options.id,
      linkMan: options.linkMan,
      t_company_name: options.t_company_name,
    })
  },

  onShow: function () {
    this.setData({
      sign_tmp_file: wx.getStorageSync('sign_tmp_file')
    })
  },

  // 页面跳转 - 去签字
  goSignPage: function () {
    wx.navigateTo({
      url: '/pages/signModule/signPage/signPage',
    })
  },

  // 已签好 确定提交
  voucherSavesign: function () {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确定提交？',
      success: function (res) {
        if (res.confirm) {
          _this.modalConfirm()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 弹框确认
  modalConfirm: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.uploadFile({
      url: `${baseURL}/voucher/savesign`,
      filePath: this.data.sign_tmp_file,
      name: 'file',
      header: {
        Authorization: `Bearer ${wx.getStorageSync('token')}`
      },
      formData: {
        voucher_id: this.data.id,
      },
      success: function (res) {
        const data = JSON.parse(res.data)
        console.log('data', data);
        wx.hideLoading()
        wx.showToast({
          title: '操作成功'
        })
        wx.removeStorageSync('sign_tmp_file')
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 200)
      },
      fail: function (error) {
        console.log('error', error);
        wx.hideLoading()
        wx.showToast({
          title: err.msg,
          icon: 'none'
        })
      }
    })
    // esRequest('savesign', {
    //   voucher_id: this.data.id,
    //   file: this.data.sign_tmp_file
    // }).then(res => {
    //   console.log('res', res);
    //   wx.hideLoading()
    //   wx.showToast({
    //     title: '操作成功'
    //   })
    //   wx.removeStorageSync('sign_tmp_file')
    //   setTimeout(() => {
    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   }, 200)
    //   wx.hideLoading();
    // }).catch((err) => {
    //   console.log('err', err);
    //   wx.hideLoading()
    //   wx.showToast({
    //     title: err.msg,
    //     icon: 'none'
    //   })
    // })
  }

  // 查看大图
  // previewImage: function () {
  //   wx.previewImage({
  //     current: this.data.sign_tmp_file,
  //     urls: [this.data.sign_tmp_file]
  //   })
  // }
})