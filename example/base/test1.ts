export default function getDataModel() {
  let data = 1
  const updateData: UpdateData = (newData: number) => {
    data = newData
  }
  return {
    data,
    updateData
  }
}

export type UpdateData = (newData: number) => void
