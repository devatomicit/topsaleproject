import axios from 'axios'
import { getHeaders } from './headers'

export const getComments = async (adId, page = 1) => {
  const { data: res } = await axios.get(`/api/ads/${adId}/comments`, {
    headers: getHeaders(),
    params: { page },
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const comments = res.data && res.data.comments
  return comments || []
}
