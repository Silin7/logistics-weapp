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
}

module.exports = systemRequest