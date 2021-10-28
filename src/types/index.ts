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

export interface axiosParamsConfigType {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: Record<string, any>
  responseType?: string
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: axiosParamsConfigType
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
