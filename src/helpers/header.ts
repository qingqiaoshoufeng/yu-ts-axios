import { isPlainObject } from './utils'
export function formatHeader(headers: any, data: any): Record<string, any> {
  normalizeHeaderName(headers, 'Content-Type')
  // 当请求数据是对象的时候 需要转成 'application/json;charset=utf-8' 格式
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

/**
 * @param {string} headers  例如"'connection: keep-alive\r\ncontent-length: 2\r\n"
 * @return {Record<string, any>}
 */
export function formatResponseHeader(headers): Record<string, any> {
  const headersList = headers.split('\r\n')
  const headersMap = {}
  headersList.reduce((current, item) => {
    if (!item) {
      return
    }
    let [key, value] = item.split(':')
    key = key.trim()
    value = value.trim()
    if (key === '') {
      return
    }
    current[key] = value
    return current
  }, headersMap)
  return headersMap
}
