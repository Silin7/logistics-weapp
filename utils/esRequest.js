import {
  baseURL
} from "./baseURL"
import systemRequest from "./sub-unitRequest/systemRequest"

export default (localObjects, parametersData, parameters) => {
  let globalObjects = Object.assign({}, systemRequest)
  let apiMethod = globalObjects[localObjects].apiMethod
  if (parameters) {
    var requestURL = baseURL + globalObjects[localObjects].apiName + '/' + parameters
  } else {
    var requestURL = baseURL + globalObjects[localObjects].apiName
  }
  return new Promise((resolve, reject) => {
    wx.request({
      method: apiMethod,
      url: requestURL,
      data: parametersData,
      header: {
        Authorization: `Bearer ${wx.getStorageSync('token')}`
      },
      success(res) {
        if (res.data.status) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail(err) {
        console.warn('fail' + JSON.stringify(err))
        reject(err)
      }
    })
  })
}