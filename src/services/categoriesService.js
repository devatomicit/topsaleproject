import axios from 'axios'
import { getHeaders } from './headers'

export const getCategories = async () => {
  const { data: res } = await axios.get('/api/categories', {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  return res.data || []
}

export const getCategory = async id => {
  const { data: res } = await axios.get(`/api/categories/${id}`, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const category = res.data
  return category
}

export const adminCategory = async () => 
  axios.get(`/api/admin/categories/`, {
    headers: getHeaders()
  })
  export const admin_add_new_category = async (data) => 
  axios.post(`/api/admin/categories/`,data, {
    headers: getHeaders()
  })
  export const admin_update_Category = async (id,data) => 
  axios.put(`/api/admin/categories/${id}`,data, {
    headers: getHeaders()
  })
  export const admin_delete_Category = async (id) => 
  axios.delete(`/api/admin/categories/${id}`, {
    headers: getHeaders()
  })
  export const adminadd_subCategory = async (data) => 
  axios.post(`/api/admin/subcategories/${data.id}`,data, {
    headers: getHeaders()
  })
  export const adminupdate_subCategory = async (data) => 
  axios.put(`/api/admin/subcategories/${data.id}`, {
    headers: getHeaders()
  })
  export const admindelete_subCategory = async (id) => 
  axios.delete(`/api/admin/subcategories/${id}`, {
    headers: getHeaders()
  })

  export const getyypes = async (id) => axios.get(`/api/admin/categories/${id}/types/`,{
    headers: getHeaders()
  })

  export const getgrouped = async (id) => axios.get('/api/getCategoriesGroupd',{ headers: getHeaders()})