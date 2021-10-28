/**
 *  把params 拼接到 url 上。
 */

import { isDate, isPlainObject } from './utils'

export function formatUrl(url: string, params: Record<string, any>): string {
  // debugger
  let result: string = url
  if (!params) return result
  result = getUrl(url) + getParamsString(params)
  return result
}

/**
 *  处理url做后续拼接
 *  @param url:sting
 *  @return url:sting
 */

function getUrl(url: string): string {
  let result = url
  url = url.split('#')[0]
  result += url.includes('?') ? '&' : '?'
  return result
}

/**
 *  处理params参数组成参数字符串做后续拼接
 *  @param params:Record<string, any>
 *  @return url:sting
 */
function getParamsString(params: Record<string, any>): string {
  let paramsStringList: string[] = []
  paramsStringList = Object.entries(params).reduce((currentStringList, [key, value]) => {
    let paramsStringItem = ''
    if (value === null || value === undefined) {
      return currentStringList
    }
    let values: any[] = []
    if (Array.isArray(value)) {
      key += '[]' // 给value是数组的键值对 的key 添加 []
      values = value
    } else {
      values = [value] //value 不是数组的将value放入到一个数组中
    }

    values.forEach(valueItem => {
      if (isDate(valueItem)) {
        valueItem = valueItem.toISOString()
      } else if (isPlainObject(valueItem)) {
        valueItem = JSON.stringify(valueItem)
      }
      paramsStringItem = `${encode(key)}=${encode(valueItem)}` as string
      currentStringList.push(paramsStringItem)
    })
    return currentStringList
  }, paramsStringList)

  return paramsStringList.join('&')
}

/**
 *  参数加密
 *  @param val 需要加密的参数
 *  @returns 加密后去除各类符号字符串的参数
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
