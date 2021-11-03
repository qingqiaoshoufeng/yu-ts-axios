import { AxiosParamsConfigType, AxiosPromise } from '../types'
import { formatUrl } from '../helpers/url'
import { formatData } from '../helpers/data'
import { formatHeader } from '../helpers/header'
import { xhr } from './xhr'
export function request(config: AxiosParamsConfigType): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosParamsConfigType): void {
  config.url = transformUrl(config)
  config.headers = transformHeader(config)
  config.data = transformData(config)
}

function transformUrl(config: AxiosParamsConfigType): string {
  const { url, data } = config
  return formatUrl(url!, data)
}

function transformData(config: AxiosParamsConfigType): string {
  const { data } = config
  return formatData(data)
}

function transformHeader(config: AxiosParamsConfigType): Record<string, any> {
  const { headers, data } = config
  return formatHeader(headers, data)
}
