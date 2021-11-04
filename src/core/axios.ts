import { AxiosParamsConfigType, AxiosPromise, Method, AxiosInstanceType } from '../types'
import { request } from './request'

export default class Axios {
  /**
   * @description 函数重载
   * @example:
   * const a: AxiosInstanceType = (a, b) => {
   *    return ('xxx' as any) as AxiosPromise
   * }
   * a(1)  error// 第一个参数必须为 string|AxiosParamsConfigType 第二个参数为 AxiosParamsConfigType|undefined
   * @address  https://www.tslang.cn/docs/handbook/functions.html
   */
  request(url: string, config: AxiosParamsConfigType): AxiosPromise {
    if (toString.call(url).includes('String')) {
      config.url = url
    } else {
      config = url as AxiosParamsConfigType
    }
    return request(config)
  }

  get(url: string, config?: AxiosParamsConfigType): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosParamsConfigType): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosParamsConfigType): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosParamsConfigType): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosParamsConfigType): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosParamsConfigType): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosParamsConfigType): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosParamsConfigType) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosParamsConfigType) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
