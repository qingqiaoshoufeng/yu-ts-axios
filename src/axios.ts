import Axios from './core/axios'
import { AxiosInstanceType, AxiosErrorParamsType, CreatAxiosInstanceType } from './types'
import { extend } from './helpers/utils'

const createInstance: CreatAxiosInstanceType = () => {
  /**
   * @description 所有调用原型方法上的使用方式
   * 例如： axios.get({...parms}) 等
   */
  const context = new Axios()
  console.log(context, '11')
  /**
   * @description 直接使用axios的方法 例如：
   * axios(parmas)
   */
  let instance = Axios.prototype.request.bind(context)
  instance = extend(instance, context)
  return instance as AxiosInstanceType
}

export const instance = createInstance()
