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
  articlelist: {
    apiMethod: 'GET',
    apiName: '/articlelist',
    name: '文章列表页面'
  },
  article: {
    apiMethod: 'GET',
    apiName: '/article',
    name: '文章详细'
  },
  getphonecode: {
    apiMethod: 'GET',
    apiName: '/getphonecode',
    name: '获取手机验证码（物流司机）'
  },
  getcompanyphonecode: {
    apiMethod: 'GET',
    apiName: '/getcompanyphonecode',
    name: '获取手机验证码（企业负责人）'
  },
}

module.exports = systemRequest