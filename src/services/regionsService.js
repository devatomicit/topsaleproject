import axios from 'axios'
import { getHeaders } from './headers'

export const getRegions = async () => {
  const { data: res } = await axios.get('/api/regions', {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  return res.data || []
}

export const getadminregion = async () => axios.get('/api/admin/regions', {
  headers: getHeaders()
})

export const postnewadminregion = async (region) => axios.post('/api/admin/regions',region, {
  headers: getHeaders()
})
export const updateedminregion = async (region) => axios.put(`/api/admin/regions/${region.id}`,region, {
  headers: getHeaders()
})
export const deletedminregion = async (id) => axios.delete(`/api/admin/regions/${id}`, {
  headers: getHeaders()
})