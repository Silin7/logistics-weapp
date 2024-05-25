let systemRequest = {
  wxLogin: {
    apiMethod: 'POST',
    apiName: '/login',
    name: '微信授权'
  },
  portal: {
    apiMethod: 'GET',
    apiName: '/portal',
    name: '首页数据'
  },
}

module.exports = systemRequest