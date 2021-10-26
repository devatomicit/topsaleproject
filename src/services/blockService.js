import axios from 'axios'
import { getHeaders } from './headers'

export const getBlockList = async (page = 1) => {
  const { data: res } = await axios.get('/api/block-list', {
    headers: getHeaders(),
    params: { page },
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const users = res.data && res.data.users
  return users || []
}

export const blockUser = async userId => {
  const { data: res } = await axios.post(
    `/api/block-user/${userId}`,
    {},
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)
  return { message, success }
}

export const unblockUser = async userId => {
  const { data: res } = await axios.post(
    `/api/unblock-user/${userId}`,
    {},
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)
  return { message, success }
}
