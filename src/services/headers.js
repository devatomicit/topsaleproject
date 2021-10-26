import { getLang, getToken } from '../utils/helper'

export const getHeaders = () => {
  const headers = {
    platform: 'web',
    'app-version': '1.0.0',
    'device-id': '123',
    'Accept-Language': getLang(),
  }

  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  return headers
}
