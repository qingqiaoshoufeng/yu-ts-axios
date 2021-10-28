import { axiosParamsConfigType, AxiosResponse } from '../types'
import { formatResponseHeader } from '../helpers/header'

export function xhr(config: axiosParamsConfigType) {
  const { data = null, url, method = 'get', headers = {} } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)

  request.onreadystatechange = function() {
    const {
      readyState,
      getAllResponseHeaders,
      responseType,
      response,
      responseText,
      status
    } = request
    console.log(request, 'request')
    if (readyState !== 4) {
      return
    }
    // 获取响应头所有头部
    const responseHeaders = getAllResponseHeaders.call(request)
    const responseData = responseType && responseType !== 'text' ? response : responseText
    const responseMap: AxiosResponse = {
      data: responseData,
      status: status,
      statusText: request.statusText,
      headers: formatResponseHeader(responseHeaders),
      config,
      request
    }
    console.log(responseMap)
  }
}
