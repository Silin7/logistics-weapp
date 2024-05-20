// 登录校验
const loginCheck = function () {
  if (!wx.getStorageSync('isRegister')) {
    return false
  } else {
    if (!wx.getStorageSync('userInfo')) {
      return false
    } else {
      return true
    }
  }
}

module.exports = {
  loginCheck,
}