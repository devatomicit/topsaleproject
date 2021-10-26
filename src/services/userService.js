import axios from 'axios'
import { getHeaders } from './headers'

export const getUser = async id => {
  const { data: res } = await axios.get(`/api/users/${id}`, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const { user } = res.data
  return user
}

export const getadminuser = async (i) => axios.get(`/api/admin/users?page=${i}&ascending=false`, {
  headers: getHeaders(),
})
export const addadminuser = async (data) => axios.post(`/api/admin/users`,data, {
  headers: getHeaders(),
}) 

