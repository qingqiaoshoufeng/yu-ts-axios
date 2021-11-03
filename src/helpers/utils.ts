export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function isString(val): val is string {
  return toString.call(val) === '[object String]'
}

export function extend<T, U>(to: T, from: U): T & U {
  let result = <T & U>to
  for (let key in from) {
    if (!(<any>result).hasOwnProperty(key)) {
      ;(<any>result)[key] = from[key]
    }
  }
  return result
}
