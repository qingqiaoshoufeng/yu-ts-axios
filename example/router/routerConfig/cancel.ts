import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'get',
    path: '/cancel/get',
    callBack: function(req, res) {
      setTimeout(() => {
        res.json('hello')
      }, 1000)
    }
  },
  {
    method: 'post',
    path: '/cancel/post',
    callBack: function(req, res) {
      setTimeout(() => {
        res.json(req.body)
      }, 1000)
    }
  }
]

function registerCancelRouter(app: any) {
  configList.forEach(item => {
    const { method, path, callBack } = item
    app[method](path, callBack)
  })
}
export default registerCancelRouter

// function registerCancelRouter() {
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
