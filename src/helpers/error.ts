import {
  AxiosParamsConfigTypeType,
  AxiosParamsConfigType,
  AxiosErrorType,
  AxiosErrorParamsType
} from '../types'
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosParamsConfigType
  code?: string | null
  request?: any
  response?: AxiosParamsConfigTypeType
  constructor(errorParams: AxiosErrorParamsType) {
    const { message, config, code, request, response } = errorParams
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    /**
     *
     * https://github.com/microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
     * @description 在ts继承原生类的时候 编译成es5的时候 由于this的指向并未正确的指向该子类原型（AxiosError）而是指向了父类（Error）导致axios方法不能正常使用
     */
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
/**
 * @description 实例化AxiosError
 * @param {AxiosErrorParamsType} 入参
 */
export function createError(errorParams: AxiosErrorParamsType) {
  return new AxiosError(errorParams)
}

// const a = new AxiosError({
//   message: '',
//   config: { url: '' },
//   code: '200',
//   request: 1,
//   response: {
//     data: 1,
//     status: 1,
//     statusText: 'string',
//     headers: 1,
//     config: { url: '' },
//     request: {}
//   }
// })
