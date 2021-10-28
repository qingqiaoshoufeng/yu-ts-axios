import { axiosParamsConfigType } from '../types'

export function xhr(config: axiosParamsConfigType) {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  request.open(method.toUpperCase(), url, true)
  request.send(data)
}
