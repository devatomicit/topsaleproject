import { createContext } from 'react'

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  lang: 'ar',
  onChangeState: state => {},
  onUpdateUser: user => {},
  onUpdateLang: lang => {},
  contextchangedata:rechercheddate=>{},
  onupdateside:updatesilde =>{},
  rechercheddate:'',
  updatesilde:''

})

export default AuthContext
