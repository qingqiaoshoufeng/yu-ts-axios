import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'post',
    path: '/config/post',
    callBack: function(req, res) {
      res.json(req.body)
    }
  }
]

function registerConfigRouter(app: any) {
  configList.forEach(item => {
    const { method, path, callBack } = item
    app[method](path, callBack)
  })
}
export default registerConfigRouter

// function registerConfigRouter() {
//   router.post('/config/post', function(req, res) {
//     res.json(req.body)
//   })
// }
