import { axiosParamsConfigType, AxiosResponse, AxiosPromise } from '../types'
import { formatResponseHeader } from '../helpers/header'
import { formatReponseData } from '../helpers/data'
export function xhr(config: axiosParamsConfigType): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)
    request.send(data)
    if (timeout) {
      request.timeout = timeout
    }
    request.onreadystatechange = function() {
      const {
        readyState,
        getAllResponseHeaders,
        responseType,
        response,
        responseText,
        status
      } = request
      // console.log(request, 'request')
      if (readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      // 获取响应头所有头部
      const responseHeaders = getAllResponseHeaders.call(request)
      // 获取响应头数据
      const responseData = responseType && responseType !== 'text' ? response : responseText
      // 格式化数据结构
      const responseMap: AxiosResponse = {
        data: formatReponseData(responseData),
        status: status,
        statusText: request.statusText,
        headers: formatResponseHeader(responseHeaders),
        config,
        request
      }
      handleResponse(responseMap)

      function handleResponse(response: AxiosResponse) {
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          reject(new Error(`Request failed with status code ${response.status}`))
        }
      }
      console.log(responseMap)
    }
    request.onerror = function() {
      debugger
      console.log('** An error occurred during the transaction')
      reject(reject(new Error('Network Error')))
    }
    request.ontimeout = function() {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }
  })
}

// 对response进行处理
