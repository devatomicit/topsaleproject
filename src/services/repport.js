import axios from 'axios'
import { getHeaders } from './headers'


export const getadminrepport = async (page) => axios.get(`/api/admin/ad-reports?page=${page}&ascending=false`, {
    headers: getHeaders(),
  })

  export const getadminrepportbyid= async () => axios.get(`/api/admin/ad-reports`, {
    headers: getHeaders(),
  })