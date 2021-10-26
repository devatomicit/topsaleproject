import axios from 'axios'
import { getHeaders } from './headers'

export const getnotification = async () => axios.get(`/api/notifications`, {
    headers: getHeaders()
  })

  export const postnotificationall = async (data) => axios.get(`/api/push-demo/${data.id}`,data, {
    headers: getHeaders()
  })

  export const postonenotification = async (data) => axios.post(`/api/push-demo/user/${data.user}`,data, {
    headers: getHeaders()
  })

  export const notifyuser = async (data) =>axios.post(`/api/admin/notify-user/${data.iduser}`,data,{headers: getHeaders()})
  export const notifyalluser = async (data) =>axios.post(`/api/admin/notify-all`,data,{headers: getHeaders()})