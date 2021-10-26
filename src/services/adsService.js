import axios from 'axios'
import { getHeaders } from './headers'

export const getAds = async (
  page = 1,
  { categoryId, subcategoryId, typeId, regionId, makeId, modelId, year }
) => {
  const { data } = await axios.get('/api/ads', {
    headers: getHeaders(),
    params: {
      page,
      category: categoryId,
      subcategory: subcategoryId,
      type: typeId,
      region: regionId,
      carMake: makeId,
      carModels: modelId ? [modelId] : null,
      carYears: year ? [year] : null,
    },
  })

  const success = data.success
  const message = data.message
  if (success === false) throw Error(message)

  const ads = data.data && data.data.ads
  return ads || []
}

export const getAd = async id => {
  const { data: res } = await axios.get(`/api/ads/${id}`, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const ad = res.data
  return ad
}

export const getRelatedAds = async adId => {
  const { data: res } = await axios.get(`/api/ads/${adId}/related`, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const ads = res.data && res.data.ads
  return ads || []
}

export const getUserAds = async (userId, page = 1) => {
  const { data } = await axios.get('/api/ads', {
    headers: getHeaders(),
    params: { page, user: userId },
  })

  const success = data.success
  const message = data.message
  if (success === false) throw Error(message)

  const ads = data.data && data.data.ads
  return ads || []
}

export const increaseAdViews = async id => {
  const { data: res } = await axios.post(
    `/api/ads/${id}/new-view`,
    {},
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const { newViewsCount } = res.data
  return { newViewsCount, success, message }
}

export const toggleLike = async id => {
  const { data: res } = await axios.post(
    `/api/ads/${id}/toggle-like`,
    {},
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const newLikesCount = res.data && res.data.newLikesCount
  return { newLikesCount, message }
}

export const reportAd = async (id, text) => {
  const { data: res } = await axios.post(
    `/api/ads/${id}/report`,
    { text },
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  return { message }
}

export const getadminads = (i) => axios.get(`api/admin/ads/?page=${i}&ascending=false`,{
  headers: getHeaders(),
})
export const getumprovedads = (i) => axios.get(`api/admin/ads/?page=${i}&ascending=false&isApproved=false`,{
  headers: getHeaders(),
})
export const rejectedads = (data) => axios.put(`/api/admin/ads/${data.id}/reject`,data,{headers: getHeaders()})
export const fixads = (id)=>axios.put(`/api/admin/ads/${id}/fix`)
export const   adsaproved = (id) => axios.put(`/api/admin/ads/${id}/approve`,{},{headers: getHeaders()})
export const  adsdelete = (id) => axios.delete(`/api/admin/ads/${id}`,{headers: getHeaders()})



