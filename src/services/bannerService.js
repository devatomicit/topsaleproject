import axios from 'axios'
import { getHeaders } from './headers'

export const getadminbaners = async () => axios.get(
    `api/admin/banners/`,
    {
      headers: getHeaders(),
    }
  )
  export const deleteadminbaners = async (id) => axios.delete(
    `api/admin/banners/${id}`,
    {
      headers: getHeaders(),
    }
  )
  export const createnew = async (data) => axios.post( `api/admin/Banners`,data,
  {
    headers: getHeaders(),
  })


  export const updatebanner = async (id,banner) => axios.put(
    `api/admin/Banners/${id}`,banner,
    {
      headers: getHeaders(),
    })
    