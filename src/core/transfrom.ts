import { isDate, isPlainObject } from '../helpers/utils'

export function transfrom(data: any): string {
  let result: string = ''
  if (isDate(data)) {
    result = data.toISOString()
  } else if (isPlainObject(data)) {
  }
  return result
}
