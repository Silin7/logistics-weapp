import {
  baseURL
} from '../../../utils/baseURL'

Page({
  data: {
    t_company_name: '',
    sign_tmp_file: '',
    sign_tel: '',
  },

  onShow: function () {
    let huodan = wx.getStorageSync('huodan')
    this.setData({
      t_company_name: huodan.t_company_name,
      sign_tmp_file: wx.getStorageSync('sign_tmp_file')
    })
  },

  // 手机号 - input
  signPhoneInput: function (e) {
    this.setData({
      sign_tel: e.detail.value
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
    if (!this.data.sign_tmp_file) {
      wx.showToast({
        title: '请先去签字',
        icon: 'none'
      })
      return
    }
    if (!this.data.sign_tel) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    // let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
    // if (!phoneReg.test(this.data.sign_tel)) {
    //   wx.showToast({
    //     title: '手机号格式错误',
    //     icon: 'none'
    //   })
    //   return
    // }
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
    let huodan = wx.getStorageSync('huodan')
    wx.uploadFile({
      url: `${baseURL}/delivery/savesign`,
      filePath: this.data.sign_tmp_file,
      name: 'file',
      header: {
        Authorization: `Bearer ${wx.getStorageSync('token')}`
      },
      formData: {
        voucher_id: huodan.id || '',
        sign_tel: this.data.sign_tel
      },
      success: function (res) {
        const data = JSON.parse(res.data)
        console.log('弹框确认', data);
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
          title: err.message,
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
    //     title: err.message,
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