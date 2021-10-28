// 文件加载去中心化
// import * as fs from 'fs'
// import * as path from 'path'
const fs = require('fs')
const path = require('path')
var { compose } = require('compose-middleware')
/**
 * @param {String} filePath 目录绝对路径
 * @param {Regexp} filters 过滤器
 * @param {Boolean} deep   是否遍历子目录
 * @returns {Array}
 * @文档 https://segmentfault.com/a/1190000016342795
 * @文档 https://segmentfault.com/a/1190000016342795
 */
function requireContext(filePath, filters, deep) {
  // 文件直接退出
  if (fs.statSync(filePath).isFile()) {
    return [filePath]
  }

  // 过滤器不是正则
  if (filters && !(filters instanceof RegExp)) {
    throw new Error('filters must Regexp')
  }

  let filesArray = []
  findFile(filePath, deep, filesArray)

  return filters ? filesArray.filter(item => filters.test(item)) : filesArray
}

function findFile(filePath, deep, filesArray) {
  let files = fs.readdirSync(filePath)

  files.forEach(item => {
    let fPath = path.resolve(filePath, item)

    if (fs.statSync(fPath).isFile()) {
      filesArray.push(fPath)
    } else if (deep) {
      findFile(fPath, deep, filesArray)
    }
  })
}

export default requireContext
