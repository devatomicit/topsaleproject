import axios from 'axios'
import { getHeaders } from './headers'

export const getmaincat = async () => axios.get(
    `api/admin/maincategories`,
    {
      headers: getHeaders(),
    }
  )
  export const updatemaincat = async (data) => axios.put(
    `api/admin/maincategories/${data.id}`,data,
    {
      headers: getHeaders(),
    }
  )

  export const sortmaincategory = async (data) => axios.put("/api/admin/maincategories-sort",data, {
    headers: getHeaders(),
  })