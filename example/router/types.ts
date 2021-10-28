export interface configItem {
  method: string
  path: string
  callBack: (req: any, res: any) => void
}
