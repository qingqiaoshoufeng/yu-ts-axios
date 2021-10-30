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
  url: string
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
