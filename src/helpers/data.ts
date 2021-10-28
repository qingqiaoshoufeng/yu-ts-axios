import { isPlainObject } from './utils'

export function formatData(data: any): any {
  let result = data
  if (isPlainObject(data)) {
    result = JSON.stringify(result)
  }
  return result
}

export function formatReponseData(data) {}
