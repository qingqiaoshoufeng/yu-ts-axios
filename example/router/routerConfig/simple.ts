import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'get',
    path: '/simple/get',
    callBack: function(req, res) {
      res.json({
        msg: `hello world`
      })
    }
  }
  // {
  //   method: 'options',
  //   path: '/extend/options',
  //   callBack: function(req, res) {
  //     res.end()
  //   }
  // },
  // {
  //   method: 'delete',
  //   path: '/extend/delete',
  //   callBack: function(req, res) {
  //     res.end()
  //   }
  // },
  // {
  //   method: 'head',
  //   path: '/extend/head',
  //   callBack: function(req, res) {
  //     res.end()
  //   }
  // },
  // {
  //   method: 'post',
  //   path: '/extend/post',
  //   callBack: function(req, res) {
  //     res.json(req.body)
  //   }
  // },
  // {
  //   method: 'put',
  //   path: '/extend/head',
  //   callBack: function(req, res) {
  //     res.end()
  //   }
  // }
]

function registerSimpleRouter(app: any) {
  configList.forEach(item => {
    const { method, path, callBack } = item
    app[method](path, callBack)
  })
}
export default registerSimpleRouter

// function registerSimpleRouter() {
//   router.get('/simple/get', function(req, res) {
//     res.json({
//       msg: `hello world`
//     })
//   })
// }
