Page({
  data: {
    openpwd: '',
  },

  // 验证码 - input
  openpwdInput: function (e) {
    this.setData({
      openpwd: e.detail.value
    })
  },

  // 提交按钮 - 弹出
  submitFunction: function () {
    if (!this.data.openpwd) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return
    }
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/hetongModule/hetongList/hetongList?openpwd=' + this.data.openpwd,
      })
    }, 200)
  },
})