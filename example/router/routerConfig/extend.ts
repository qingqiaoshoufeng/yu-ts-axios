import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'get',
    path: '/extend/get',
    callBack: function(req, res) {
      console.log(req)
      debugger
      res.json({
        msg: 'hello world'
      })
    }
  },
  {
    method: 'options',
    path: '/extend/options',
    callBack: function(req, res) {
      res.end()
    }
  },
  {
    method: 'delete',
    path: '/extend/delete',
    callBack: function(req, res) {
      res.end()
    }
  },
  {
    method: 'head',
    path: '/extend/head',
    callBack: function(req, res) {
      res.end()
    }
  },
  {
    method: 'post',
    path: '/extend/post',
    callBack: function(req, res) {
      res.json(req.body)
    }
  },
  {
    method: 'put',
    path: '/extend/put',
    callBack: function(req, res) {
      res.json(req.body)
    }
  },
  {
    method: 'patch',
    path: '/extend/patch',
    callBack: function(req, res) {
      res.json(req.body)
    }
  },
  {
    method: 'get',
    path: '/extend/user',
    callBack: function(req, res) {
      res.json({
        code: 0,
        message: 'ok',
        result: {
          name: 'jack',
          age: 18
        }
      })
    }
  }
]

function registerExtendRouter(app: any) {
  configList.forEach(item => {
    const { method, path, callBack } = item
    app[method](path, callBack)
  })
}
export default registerExtendRouter

// function registerExtendRouter() {
// router.get('/extend/get', function(req, res) {
//   res.json({
//     msg: 'hello world'
//   })
// })
// router.options('/extend/options', function(req, res) {
//   res.end()
// })
// router.delete('/extend/delete', function(req, res) {
//   res.end()
// })
// router.head('/extend/head', function(req, res) {
//   res.end()
// })
// router.post('/extend/post', function(req, res) {
//   res.json(req.body)
// })
// router.put('/extend/put', function(req, res) {
//   res.json(req.body)
// })
// router.patch('/extend/patch', function(req, res) {
//   res.json(req.body)
// })
// router.get('/extend/user', function(req, res) {
//   res.json({
//     code: 0,
//     message: 'ok',
//     result: {
//       name: 'jack',
//       age: 18
//     }
//   })
// })
// }
