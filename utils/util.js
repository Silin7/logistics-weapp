// 登录校验
const loginCheck = function () {
  if (!wx.getStorageSync('registered')) {
    return false
  } else {
    if (!wx.getStorageSync('profile')) {
      return false
    } else {
      return true
    }
  }
}

module.exports = {
  loginCheck,
}