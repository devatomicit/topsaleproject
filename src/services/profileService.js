import axios from 'axios'
import FormData from 'form-data'
import { getHeaders } from './headers'
import { dataURLtoFile } from '../utils/helper'

export const getProfile = async () => {
  const { data: res } = await axios.get('/api/profile', {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const user = res.data && res.data.user
  return user
}

export const updateProfile = async ({ name, email, bio, image }) => {
  const data = new FormData()
  if (name) data.append('name', name)
  if (email) data.append('email', email)
  if (bio) data.append('bio', bio)
  if (image && image.data_url) {
    const file = dataURLtoFile(image.data_url)
    data.append('image', file, file.name)
  }

  const { data: res } = await axios.put(`/api/profile/update`, data, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const user = res.data && res.data.user
  return { message, user }
}

export const stat = () => axios.get('/api/admin/stats',{
  headers: getHeaders(), 
})
