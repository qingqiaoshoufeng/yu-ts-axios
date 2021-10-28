// 集成 所有路由
import * as webpack from 'webpack'
import requireContext from './utils/requireContext'
import * as path from 'path'
const routerList = requireContext(path.join(__dirname + '/routerConfig/'), false, /\.ts$/).map(
  item => require(item).default
)
console.log(routerList)

export default routerList
// function registerErrorRouter () {
//   router.get('/error/get', function(req, res) {
//     if (Math.random() > 0.5) {
//       res.json({
//         msg: `hello world`
//       })
//     } else {
//       res.status(500)
//       res.end()
//     }
//   })

//   router.get('/error/timeout', function(req, res) {
//     setTimeout(() => {
//       res.json({
//         msg: `hello world`
//       })
//     }, 3000)
//   })
// }

// function registerExtendRouter () {
//   router.get('/extend/get', function(req, res) {
//     res.json({
//       msg: 'hello world'
//     })
//   })

//   router.options('/extend/options', function(req, res) {
//     res.end()
//   })

//   router.delete('/extend/delete', function(req, res) {
//     res.end()
//   })

//   router.head('/extend/head', function(req, res) {
//     res.end()
//   })

//   router.post('/extend/post', function(req, res) {
//     res.json(req.body)
//   })

//   router.put('/extend/put', function(req, res) {
//     res.json(req.body)
//   })

//   router.patch('/extend/patch', function(req, res) {
//     res.json(req.body)
//   })

//   router.get('/extend/user', function(req, res) {
//     res.json({
//       code: 0,
//       message: 'ok',
//       result: {
//         name: 'jack',
//         age: 18
//       }
//     })
//   })
// }

// function registerInterceptorRouter () {
//   router.get('/interceptor/get', function(req, res) {
//     res.end('hello')
//   })
// }

// function registerConfigRouter () {
//   router.post('/config/post', function(req, res) {
//     res.json(req.body)
//   })
// }

// function registerCancelRouter () {
//   router.get('/cancel/get', function(req, res) {
//     setTimeout(() => {
//       res.json('hello')
//     }, 1000)
//   })

//   router.post('/cancel/post', function(req, res) {
//     setTimeout(() => {
//       res.json(req.body)
//     }, 1000)
//   })
// }

// function registerMoreRouter () {
//   router.get('/more/get', function(req, res) {
//     res.json(req.cookies)
//   })

//   router.post('/more/upload', function(req, res) {
//     console.log(req.body, req.files)
//     res.end('upload success!')
//   })

//   router.post('/more/post', function(req, res) {
//     const auth = req.headers.authorization
//     const [type, credentials] = auth.split(' ')
//     console.log(atob(credentials))
//     const [username, password] = atob(credentials).split(':')
//     if (type === 'Basic' && username === 'Yee' && password === '123456') {
//       res.json(req.body)
//     } else {
//       res.status(401)
//       res.end('UnAuthorization')
//     }
//   })

//   router.get('/more/304', function(req, res) {
//     res.status(304)
//     res.end()
//   })

//   router.get('/more/A', function(req, res) {
//     res.end('A')
//   })

//   router.get('/more/B', function(req, res) {
//     res.end('B')
//   })
// }
