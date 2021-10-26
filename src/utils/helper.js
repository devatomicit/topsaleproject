import ar from '../strings/ar.json'
import en from '../strings/en.json'

export const isAuthenticated = () => {
  return getToken() !== null
 
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const getUserId = () => {
  return localStorage.getItem('userId')
}

export const persistUser = user => {
  return localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  const userString = localStorage.getItem('user')
  if (userString) return JSON.parse(userString)
  return null
}

export const clearLoginData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('user')
}

export const persistLang = lang => {
  return localStorage.setItem('lang', lang)
}

export const getLang = () => {
  return localStorage.getItem('lang') || 'ar'
}

export const getYears = () => {
  return [2021, 2020, 2019, 2018, 2017, 2016, 2015]
}

const strings = {
  ar,
  en,
}

export const t = key => {
  return strings[getLang()][key] || key
}

// helper function: generate a new file from base64 String
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime })
}



  export  const decodetoken = () => {
    let token = localStorage.getItem("token")
    if (token) {
    const jwtData = token.split('.')[1]
    const decodedJwtJsonData = window.atob(jwtData)
    let dateNow = new Date();
    const stringdate =  dateNow.getTime().toString()
    if(JSON.parse(decodedJwtJsonData).exp < stringdate.slice(0,stringdate.length-3))
    return {isExpired: true};
    else
  return JSON.parse(decodedJwtJsonData)
    }
    else return undefined
  }
