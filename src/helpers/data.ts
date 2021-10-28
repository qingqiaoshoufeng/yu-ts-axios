import { isPlainObject, isString } from './utils'
import { AxiosResponse } from '../types'

export function formatData(data: any): any {
  let result = data
  if (isPlainObject(data)) {
    result = JSON.stringify(result)
  }
  return result
}
/**
 * @param { AxiosResponse['data']} data
 * @return {AxiosResponse['data']}
 */
export function formatReponseData(data: AxiosResponse['data']): any {
  if (isString(data)) {
    try {
      // debugger
      data = JSON.parse(data)
      console.log(data)
    } catch (e) {
      // throw new Error('返回的data格式不为json')
      console.log('返回的data格式不为json')
    }
  }
  return data
}
