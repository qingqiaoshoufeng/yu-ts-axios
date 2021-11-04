export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosParamsConfigType {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: Record<string, any>
  responseType?: string
  timeout?: number
}

export interface AxiosParamsConfigTypeType {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosParamsConfigType
  request: any
}

export interface AxiosPromise extends Promise<AxiosParamsConfigTypeType> {}

export interface AxiosErrorType extends Error {
  config: AxiosParamsConfigType
  code?: string
  request?: any
  response?: AxiosParamsConfigTypeType
  isAxiosError: boolean
}

export interface AxiosErrorParamsType {
  message: string
  config: AxiosParamsConfigType
  code?: string | null
  request?: any
  response?: AxiosParamsConfigTypeType
}

export type errorParamsMapType = Record<string, AxiosErrorParamsType>

/**
 *  @description axios 原型类
 */

export interface Axios {
  request(config: AxiosParamsConfigType): AxiosPromise

  get(url: string, config?: AxiosParamsConfigType): AxiosPromise

  delete(url: string, config?: AxiosParamsConfigType): AxiosPromise

  head(url: string, config?: AxiosParamsConfigType): AxiosPromise

  options(url: string, config?: AxiosParamsConfigType): AxiosPromise

  post(url: string, data?: any, config?: AxiosParamsConfigType): AxiosPromise

  put(url: string, data?: any, config?: AxiosParamsConfigType): AxiosPromise

  patch(url: string, data?: any, config?: AxiosParamsConfigType): AxiosPromise
}

/**
 *  @description axios 实例类
 */
export interface AxiosInstanceType extends Axios {
  (config: AxiosParamsConfigType): AxiosPromise
  /**
   * @description 函数重载
   * @example:
   * const a: AxiosInstanceType = (a, b) => {
   *    return ('xxx' as any) as AxiosPromise
   * }
   * a(1)  error// 第一个参数必须为 string|AxiosParamsConfigType 第二个参数为 AxiosParamsConfigType|undefined
   * @address  https://www.tslang.cn/docs/handbook/functions.html
   */
  (url: string, config?: AxiosParamsConfigType): AxiosPromise
}

export type CreatAxiosInstanceType = () => AxiosInstanceType

// const a: AxiosInstanceType = (a, b) => {
//   return ('xxx' as any) as AxiosPromise
// }
// a(1)
