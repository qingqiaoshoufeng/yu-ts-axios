import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'get',
    path: '/base/get',
    callBack: function(req, res) {
      res.json(req.query)
    }
  },
  {
    method: 'post',
    path: '/base/post',
    callBack: function(req, res) {
      res.json(req.query)
    }
  },
  {
    method: 'post',
    path: '/base/buffer',
    callBack: function(req, res) {
      let msg: any[] = []
      req.on('data', (chunk: any) => {
        if (chunk) {
          msg.push(chunk)
        }
      })
      req.on('end', () => {
        let buf = Buffer.concat(msg)
        res.json(buf.toJSON())
      })
    }
  }
]

function registerBaseRouter(app: any) {
  configList.forEach(item => {
    const { method, path, callBack } = item
    app[method](path, callBack)
  })
}
export default registerBaseRouter
// function registerBaseRouter() {
//   router.get('/base/get', function(req, res) {
//     res.json(req.query)
//   })

//   router.post('/base/post', function(req, res) {
//     res.json(req.body)
//   })

//   router.post('/base/buffer', function(req, res) {
//     let msg = []
//     req.on('data', chunk => {
//       if (chunk) {
//         msg.push(chunk)
//       }
//     })
//     req.on('end', () => {
//       let buf = Buffer.concat(msg)
//       res.json(buf.toJSON())
//     })
//   })
// }
