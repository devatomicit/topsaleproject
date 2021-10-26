import axios from 'axios'
import { getHeaders } from './headers'

export const getAds = async (page = 1) => {
  const { data: res } = await axios.get('/api/my-favourite', {
    headers: getHeaders(),
    params: { page },
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const ads = res.data && res.data.ads
  return ads || []
}

export const toggleFavorite = async id => {
  const { data: res } = await axios.post(
    `/api/ads/${id}/toggle-favourite`,
    {},
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const isFavourite = res.data && res.data.isFavourite
  return { isFavourite, message }
}
