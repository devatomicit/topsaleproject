import axios from 'axios'
import FormData from 'form-data'
import { dataURLtoFile } from '../utils/helper'
import { getHeaders } from './headers'

export const getMyAds = async (page = 1) => {
  const { data: res } = await axios.get('/api/my-ads', {
    headers: getHeaders(),
    params: { page },
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const ads = res.data && res.data.ads
  return ads || []
}

export const deleteAd = async adId => {
  const { data: res } = await axios.delete(`/api/my-ads/${adId}`, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  return { success, message }
}

export const republishAd = async adId => {
  const { data: res } = await axios.put(
    `/api/my-ads/${adId}/republish`,
    {},
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const { ad } = res.data
  return { success, message, ad }
}

export const toggleAdActivation = async (adId, isActive) => {
  const endpoint = isActive ? 'deactivate' : 'activate'

  const { data: res } = await axios.put(
    `/api/my-ads/${adId}/${endpoint}`,
    {},
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const { ad } = res.data
  return { success, message, ad }
}

export const postAd = async ({
  categoryId,
  subcategoryId,
  typeId,
  regionId,
  makeId,
  modelId,
  year,
  km,
  title,
  price,
  details,
  images,
}) => {
  const data = new FormData()
  if (categoryId) data.append('category', categoryId)
  if (subcategoryId) data.append('subcategory', subcategoryId)
  if (typeId) data.append('type', typeId)
  if (regionId) data.append('region', regionId)
  if (makeId) data.append('carMake', makeId)
  if (modelId) data.append('carModel', modelId)
  if (year) data.append('carYear', year)
  if (km) data.append('km', km)
  if (title) data.append('title', title)
  if (price) data.append('price', price)
  if (details) data.append('details', details)

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      const file = dataURLtoFile(image.data_url)
      data.append('photos', file, file.name)
    }
  }

  const { data: res } = await axios.post(`/api/my-ads`, data, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const ad = res.data && res.data.ad
  return { message, ad }
}
