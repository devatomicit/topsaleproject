import axios from 'axios'
import { getHeaders } from './headers'

export const getFollowers = async (page = 1) => {
  const { data: res } = await axios.get('/api/followers-list', {
    headers: getHeaders(),
    params: { page },
  })
  



  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const users = res.data && res.data.users
  return users || []
}

export const getFollowings = async (page = 1) => {
  const { data: res } = await axios.get('/api/followings-list', {
    headers: getHeaders(),
    params: { page },
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const users = res.data && res.data.users
  return users || []
}

export const followUser = async userId => {
  const { data: res } = await axios.post(
    `/api/follow-user/${userId}`,
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

export const unfollowUser = async userId => {
  const { data: res } = await axios.post(
    `/api/unfollow-user/${userId}`,
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
