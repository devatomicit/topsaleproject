import axios from 'axios'
import { getHeaders } from './headers'
import join from 'url-join'
import { api_base_prod, api_base_dev } from '../config.json'

const inDevMode =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
const prefix_url = inDevMode ? api_base_dev : api_base_prod

const isAbsoluteURLRegex = /^(?:\w+:)\/\//
axios.interceptors.request.use(function (config) {
  // Concatenate base path if not an absolute URL
  if (!isAbsoluteURLRegex.test(config.url))
    config.url = join(prefix_url, config.url)

  return config
})

export const getRecentAds = async () => {
  const { data } = await axios.get('/api/recent-ads', {
    headers: getHeaders(),
  })

  const success = data.success
  const message = data.message
  if (success === false) throw Error(message)

  const ads = data.data && data.data.ads
  return ads || []
}

export const getTopBanners = async () => {
  const { data } = await axios.get('/api/top-banners', {
    headers: getHeaders(),
  })

  const success = data.success
  const message = data.message
  if (success === false) throw Error(message)

  const banners = data.data && data.data.banners
  return banners || []
}
