import { axiosParamsConfigType, AxiosPromise } from '../types'
import { formatUrl } from '../helpers/url'
import { formatData } from '../helpers/data'
import { formatHeader } from '../helpers/header'
import { xhr } from './xhr'
export function axios(config: axiosParamsConfigType): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: axiosParamsConfigType): void {
  config.url = transformUrl(config)
  config.headers = transformHeader(config)
  config.data = transformData(config)
}

function transformUrl(config: axiosParamsConfigType): string {
  const { url, data } = config
  return formatUrl(url, data)
}

function transformData(config: axiosParamsConfigType): string {
  const { data } = config
  return formatData(data)
}

function transformHeader(config: axiosParamsConfigType): Record<string, any> {
  const { headers, data } = config
  return formatHeader(headers, data)
}
