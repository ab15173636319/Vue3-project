import axios from 'axios'
import qs from 'qs'
// 创建一个axios实例
const instance = axios.create({
  baseURL: '', // 接口的基础路径
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8' // 设置请求头
  }
})

const ajax = {
  // GET请求封装
  get(url: any, params = {}, callback: any) {
    return new Promise((resolve, reject) => {
      instance.get(url, {
        params: params
      }).then(response => {
        resolve(callback(response.data))
      }).catch(error => {
        reject(callback(error))
      })
    })
  },
  // POST请求封装
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, data).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //请求返回的是二进制图片
  Get_Img(url: any, data: any, callback: any) {
    axios({
      url: url,
      data: JSON.stringify(data),
      method: 'get',
      responseType: 'arraybuffer' // 将响应数据的类型设置为arraybuffer
    }).then(response => {
      const blob = new Blob([response.data], { type: response.headers['content-type'] }) // 将arraybuffer转为Blob对象
      const url = window.URL.createObjectURL(blob) // 生成Blob对象的临时URL
      console.log(url);
      callback(url)
    }).catch(error => {
      console.error(error)
    })
  }
}
export default ajax