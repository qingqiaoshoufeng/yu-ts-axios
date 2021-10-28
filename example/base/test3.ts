import getDataModel from './test1'
export default function request(updateData: ReturnType<typeof getDataModel>['updateData']) {
  updateData(1)
}
