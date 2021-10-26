import axios from 'axios'
import { getHeaders } from './headers'

export const getCarMakes = async () => {
  const { data: res } = await axios.get('/api/car-makes', {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  return res.data || []
}

export const getCarModels = async makeId => {
  const { data: res } = await axios.get(`/api/car-makes/${makeId}/car-models`, {
    headers: getHeaders(),
  })

  const success = res.success
  const message = res.message
  if (success === false) throw Error(message)

  return res.data || []
}
