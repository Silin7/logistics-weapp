let systemRequest = {
  wxLogin: {
    apiMethod: 'POST',
    apiName: '/login',
    name: '微信授权'
  },
  profile: {
    apiMethod: 'GET',
    apiName: '/profile',
    name: '用户登录后获取用户的相关资料'
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
  getuserphonenumber: {
    apiMethod: 'POST',
    apiName: '/getuserphonenumber',
    name: '微信手机号快速验证'
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
  voucherlist: {
    apiMethod: 'GET',
    apiName: '/voucherlist',
    name: '获取用户的合同列表'
  },
  voucherSavesign: {
    apiMethod: 'POST',
    apiName: '/voucher/savesign',
    name: '合同签字'
  },
  voucherhavesigned: {
    apiMethod: 'GET',
    apiName: '/voucherhavesigned',
    name: '合同是否签字'
  },
  deliverylist: {
    apiMethod: 'GET',
    apiName: '/deliverylist',
    name: '物流司机用户相关待签字收货确认单'
  },
  deliverySavesign: {
    apiMethod: 'POST',
    apiName: '/delivery/savesign',
    name: '物流司机用户端签字'
  },
  deliveryhavesigned: {
    apiMethod: 'GET',
    apiName: '/deliveryhavesigned',
    name: '运货单（收货确认单）是否签字'
  },
  deliverySaveimgs: {
    apiMethod: 'POST',
    apiName: '/delivery/saveimgs',
    name: '物流司机上传货物图片'
  },
  pagecontent: {
    apiMethod: 'GET',
    apiName: '/pagecontent',
    name: '单页文章详细'
  },
  getnumberplate: {
    apiMethod: 'GET',
    apiName: '/getnumberplate',
    name: '获取司机用户的车牌号'
  },
  addnumberplate: {
    apiMethod: 'POST',
    apiName: '/add/numberplate',
    name: '物流司机新增车牌'
  },
  mylogistics: {
    apiMethod: 'GET',
    apiName: '/mylogistics',
    name: '司机物流运费列表'
  },
}

module.exports = systemRequest