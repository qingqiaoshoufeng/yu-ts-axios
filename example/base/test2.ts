import getDataModel from './test1'
import request from './test3'

const { data, updateData } = getDataModel()
request(updateData)
