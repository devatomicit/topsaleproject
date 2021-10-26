import axios from 'axios'
import { getHeaders } from './headers'

export const gettopbanner= async () =>  axios.get(`/api/admin/top-banners/`, {
    headers: getHeaders()
  })
  export const posttopbanner = async (data) => axios.post(`/api/admin/top-banners`,data, {
      headers: getHeaders()
    })

export const updatebanner = async (id,data) => axios.put(`/api/admin/top-banners/${id}`,data,{
    headers: getHeaders()
})