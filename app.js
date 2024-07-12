// import esRequest from './utils/esRequest';
import {
  baseURL
} from './utils/baseURL'

App({
  onLaunch: function () {
    // 获取open_id和session_key
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            method: 'POST',
            url: baseURL + '/login',
            data: {
              'code': res.code
            },
            success: function (res2) {
              const response = res2.data
              // console.log('response', response);
              if (response.status) {
                wx.setStorageSync('registered', response.data.registered)
                wx.setStorageSync('token', response.data.token)
                if (response.data.profile) {
                  wx.setStorageSync('profile', response.data.profile)
                  wx.setStorageSync('open_id', response.data.profile.open_id)
                }
              } else {
                if (response.data && response.data.token) {
                  wx.setStorageSync('registered', response.data.registered)
                  wx.setStorageSync('open_id', response.data.open_id)
                  wx.setStorageSync('session_key', response.data.session_key)
                  wx.setStorageSync('token', response.data.token)
                }
              }
            },
            fail: function (err) {
              console.log('err', err);
            }
          })
          // esRequest('wxLogin', {
          //   code: res.code,
          // }).then(res => {
          //   wx.setStorageSync('registered', res.data.registered)
          //   wx.setStorageSync('token', res.data.token)
          //   if (res.data.profile) {
          //     wx.setStorageSync('profile', res.data.profile)
          //     wx.setStorageSync('open_id', res.data.profile.open_id)
          //   }
          // }).catch((error) => {
          //   if (error.data && error.data.token) {
          //     wx.setStorageSync('registered', error.data.registered)
          //     wx.setStorageSync('open_id', error.data.open_id)
          //     wx.setStorageSync('session_key', error.data.session_key)
          //     wx.setStorageSync('token', error.data.token)
          //   }
          // })
        }
      }
    })
  }
})

! function () {
  var PageTmp = Page;
  Page = function (pageConfig) {
    pageConfig = Object.assign({
      onShareAppMessage: function () {
        return {
          title: '荣程供应链',
          path: 'pages/homeModule/homePage',
          imageUrl: '',
        };
      }
    }, pageConfig);
    PageTmp(pageConfig);
  };
}();