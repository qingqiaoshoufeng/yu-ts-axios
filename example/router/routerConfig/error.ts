import { configItem } from '../types'

const configList: configItem[] = [
  {
    method: 'get',
    path: '/error/get',
    callBack: function(req, res) {
      if (Math.random() > 0.5) {
        res.json({
          msg: `hello world`
        })
      } else {
        res.status(500)
        res.end()
      }
    }
  },
  {
    method: 'get',
    path: '/error/timeout',
    callBack: function(req, res) {
      setTimeout(() => {
        res.json({
          msg: `hello world`
        })
      }, 3000)
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
