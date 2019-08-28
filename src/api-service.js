import { Observable, of } from 'rxjs'
import { map, delay, catchError } from 'rxjs/operators'
import environment from './environment'
import store from './store'

// 假数据
import posts from './fixtures/posts'
import post from './fixtures/post'

export default class ApiService {

  constructor () {
    this.baseUrl = environment.api_base_url
    this.apiToken = store.state.auth.api_token
  }

  get (url, headers = null) {
    return this._buildHttpRequest(url, 'GET', headers)
  }

  post (url, payload = null, headers = null) {
    return this._buildHttpRequest(url, 'POST', payload, headers)
  }

  put (url, payload = null, headers = null) {
    return this._buildHttpRequest(url, 'PUT', payload, headers)
  }

  delete (url, headers = null) {
    return this._buildHttpRequest(url, 'DELETE', headers)
  }

  // 下载, 此功能不使用 pipe, 直接在 observer 里处理小程序 api 响应数据
  downloadFile (url, filePath = null, header = null) {
    return new Observable(subscriber => {
      wx.downloadFile({
        url: this.baseUrl + url,
        ...(filePath ? { filePath } : {}),
        header: {
          'Content-Type': 'application/json',

          // 有 token 的话就塞进来, 注意后端具体写法要求
          ...(this.apiToken ? {
            'authorization': `Bearer ${this.apiToken}`,
          } : {}),

          ...(header ? header : {}),
        },
        success: res => {
          subscriber.next(res)
        },
        fail: err => {
          subscriber.error(err)
        },
        complete: res => {
          subscriber.complete(res)
        },
      })
    })
  }

  uploadFile (url, filePath, formData = null, name = 'file', header = null) {
    return new Observable(subscriber => {
      wx.uploadFile({
        url: this.baseUrl + url,
        filePath,
        ...(formData ? { formData } : {}),
        header: {
          'Accept': 'application/json',

          // 有 token 的话就塞进来, 注意后端具体写法要求
          ...(this.apiToken ? {
            'authorization': `Bearer ${this.apiToken}`,
          } : {}),

          ...(header ? header : {}),
        },
        success: res => {
          subscriber.next(res)
        },
        fail: err => {
          subscriber.error(err)
        },
        complete: res => {
          subscriber.complete(res)
        },
      })
    }).pipe(
      map(this.buildDataExtractor(method, url, data)),
      catchError(this.buildErrorHandler(method, url, data)),
    )
  }

  // 构建请求
  _buildHttpRequest (url, method, data = null, header = null) {
    const requestOptions = {
      url: this.baseUrl + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

        // 有 token 的话就塞进来, 注意后端具体写法要求
        ...(this.apiToken ? {
          'authorization': `Bearer ${this.apiToken}`,
        } : {}),

        ...(header ? header : {}),
      },
    }

    // 小程序 to Observable 风格, 使用 rxjs
    return new Observable(subscriber => {
      wx.request({
        ...requestOptions,
        success: res => {
          subscriber.next(res)
        },
        fail: err => {
          subscriber.error(err)
        },
        complete: res => {
          subscriber.complete(res)
        },
      })
    }).pipe(
      map(this.buildDataExtractor(method, url, data)),
      catchError(this.buildErrorHandler(method, url, data)),
    )
  }

  // 取出数据
  buildDataExtractor (method, url, payload) {
    return (res) => {

      // debug 时再临时打开
      // console.log(`${method.toUpperCase()}: ${url}`)
      // console.log(`payload: ${payload}`)
      // console.log('res: ', res && res.data ? res.data : res)

      /**
       * { code: 0, data: []} 这是推荐的响应样式, code = 1 有错, 为 0 为正常, data 为数据
       */
      if (res.data && res.data.status) {
        return res.data.data
      }

      // 出错, 后端抛来错误信息
      throw res
    }
  }

  // 处理错误
  buildErrorHandler (method, url, payload) {
    return (err) => {

      console.log(`${method.toUpperCase()}: ${url}`)
      console.log(`payload: ${payload}`)
      console.log('err: ', err)

      if (err && err.data && err.data.message) {
        throw Error(err.data.message)
      }

      if (err && err.message) {
        throw Error(err.message)
      }

      throw Error('网络错误(1)')
    }
  }

  // 获取文章列表, todo: 用的假数据, 后端好后注释掉假数据行
  getPosts () {
    return of(posts).pipe(delay(200))
    // return this.get(`/posts`)
  }

  // 获取文章, todo: 用的假数据, 后端好后注释掉假数据行
  getPost () {
    return of(post).pipe(delay(200))
    // return this.get(`/posts/1`)
  }

}
