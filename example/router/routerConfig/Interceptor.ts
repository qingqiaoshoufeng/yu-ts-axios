import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'get',
    path: '/interceptor/get',
    callBack: function(req, res) {
      res.end('hello')
    }
  }
]

function registerInterceptorRouter(app: any) {
  configList.forEach(item => {
    const { method, path, callBack } = item
    app[method](path, callBack)
  })
}
export default registerInterceptorRouter
// function registerInterceptorRouter() {
//   router.get('/interceptor/get', function(req, res) {

//     res.end('hello')
//   })
// }
