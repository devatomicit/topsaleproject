import axios from 'axios'
import { getHeaders } from './headers'

export const login = async (name, mobile) => {
  const { data } = await axios.post(
    '/api/login',
    { name, mobile },
    {
      headers: getHeaders(),
    }
  )

  const success = data.success
  const message = data.message
  if (success === false) throw Error(message)

  return { success, message }
}

export const verify = async (name, mobile, code) => {
  const { data: res } = await axios.post(
    '/api/login',
    { name, mobile, code },
    {
      headers: getHeaders(),
    }
  )

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  const { token, userId } = res.data
  return { token, userId, message }
}
