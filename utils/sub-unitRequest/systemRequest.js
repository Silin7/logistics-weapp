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
  uploadimgtoreg: {
    apiMethod: 'POST',
    apiName: '/uploadimgtoreg',
    name: '图片上传（用户司机注册上传驾驶照）'
  },
  driverregister: {
    apiMethod: 'POST',
    apiName: '/driverregister',
    name: '物流司机注册'
  },
  getcompanyphonecode: {
    apiMethod: 'GET',
    apiName: '/getcompanyphonecode',
    name: '获取手机验证码（企业负责人）'
  },
  directorregister: {
    apiMethod: 'POST',
    apiName: '/directorregister',
    name: '采购商注册'
  },
  uploadimg: {
    apiMethod: 'POST',
    apiName: '/uploadimg',
    name: '图片上传（用户注册后的上传）'
  },
  logistics: {
    apiMethod: 'GET',
    apiName: '/logistics',
    name: '荣程货源信息列表'
  },
}

module.exports = systemRequest