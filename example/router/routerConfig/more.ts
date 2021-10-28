import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'get',
    path: '/more/get',
    callBack: function(req, res) {
      res.json(req.cookies)
    }
  },
  {
    method: 'post',
    path: '/more/upload',
    callBack: function(req, res) {
      console.log(req.body, req.files)
      res.end('upload success!')
    }
  },
  {
    method: 'post',
    path: '/more/post',
    callBack: function(req, res) {
      const auth = req.headers.authorization
      const [type, credentials] = auth.split(' ')
      console.log(atob(credentials))
      const [username, password] = atob(credentials).split(':')
      if (type === 'Basic' && username === 'Yee' && password === '123456') {
        res.json(req.body)
      } else {
        res.status(401)
        res.end('UnAuthorization')
      }
    }
  },
  {
    method: 'get',
    path: '/more/304',
    callBack: function(req, res) {
      res.status(304)
      res.end()
    }
  },
  {
    method: 'get',
    path: '/more/A',
    callBack: function(req, res) {
      res.end('A')
    }
  },
  {
    method: 'get',
    path: '/more/A',
    callBack: function(req, res) {
      res.end('B')
    }
  }
]

function registerMoreRouter(app: any) {
  configList.forEach(item => {
    const { method, path, callBack } = item
    app[method](path, callBack)
  })
}
export default registerMoreRouter

// function registerMoreRouter() {
// router.get('/more/get', function(req, res) {
//   res.json(req.cookies)
// })

// router.post('/more/upload', function(req, res) {
//   console.log(req.body, req.files)
//   res.end('upload success!')
// })

// router.post('/more/post', function(req, res) {
//   const auth = req.headers.authorization
//   const [type, credentials] = auth.split(' ')
//   console.log(atob(credentials))
//   const [username, password] = atob(credentials).split(':')
//   if (type === 'Basic' && username === 'Yee' && password === '123456') {
//     res.json(req.body)
//   } else {
//     res.status(401)
//     res.end('UnAuthorization')
//   }
// })

// router.get('/more/304', function(req, res) {
//   res.status(304)
//   res.end()
// })

// router.get('/more/A', function(req, res) {
//   res.end('A')
// })

// router.get('/more/B', function(req, res) {
//   res.end('B')
// })
// }
