import { axiosParamsConfigType, AxiosResponse, AxiosPromise } from '../types'
import { formatResponseHeader } from '../helpers/header'
import { formatReponseData } from '../helpers/data'
export function xhr(config: axiosParamsConfigType): AxiosPromise {
  return new Promise((resove, reject) => {
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
      resove(responseMap)
      console.log(responseMap)
    }
  })
}
