import {
  AxiosParamsConfigType,
  AxiosParamsConfigTypeType,
  AxiosPromise,
  AxiosErrorParamsType,
  errorParamsMapType
} from '../types'
import { formatResponseHeader } from '../helpers/header'
import { formatReponseData } from '../helpers/data'
import { createError } from '../helpers/error'
export function xhr(config: AxiosParamsConfigType): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, timeout } = config
    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url!, true)
    request.send(data)

    const {
      readyState,
      getAllResponseHeaders,
      responseType,
      response,
      responseText,
      status
    } = request

    if (timeout) {
      request.timeout = timeout
    }
    request.onreadystatechange = function() {
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
      const responseMap: AxiosParamsConfigTypeType = {
        data: formatReponseData(responseData),
        status: status,
        statusText: request.statusText,
        headers: formatResponseHeader(responseHeaders),
        config,
        request
      }
      handleResponse(responseMap)

      function handleResponse(response: AxiosParamsConfigTypeType) {
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          // reject(new Error(`Request failed with status code ${response.status}`))
          reject(createError(getAxiosErrorParms(request, 'statusCodeException')))
        }
      }
      console.log(responseMap)
    }
    request.onerror = function() {
      debugger
      console.log('** An error occurred during the transaction')
      reject(createError(getAxiosErrorParms(request, 'statusCodeException')))
    }
    request.ontimeout = function() {
      reject(createError(getAxiosErrorParms(request, 'Timeout')))
    }
  })
}

function getAxiosErrorParms(request, type) {
  const { config } = request

  const baseErrorInfo = {
    // message: string
    config,
    // code?: string | null
    request
    // response?: AxiosParamsConfigTypeType
  }

  const errorParamsMap: errorParamsMapType = {
    statusCodeException: {
      code: 'statusCodeException',
      message: `Request failed with status code ${status}`,
      ...baseErrorInfo
    },
    NetworkError: {
      code: 'NetworkError',
      message: `'NetworkError'`,
      ...baseErrorInfo
    },
    Timeout: {
      code: 'Timeout',
      message: `请求超时`,
      ...baseErrorInfo
    }
  }
  return errorParamsMap[type]
}
