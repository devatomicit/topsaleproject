import React, { useState, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen'
import AdScreen from './screens/AdScreen'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CategoriesScreen from './screens/CategoriesScreen'
import NotFound from './screens/NotFound'
import LoginScreen from './screens/LoginScreen'
import {
  isAuthenticated,
  clearLoginData,
  getUser,
  persistUser,
  getLang,
  persistLang,
} from './utils/helper'

import AuthContext from './contexts/AuthContext'
import BlockedScreen from './screens/BlockedScreen'
import { getProfile } from './services/profileService'
import AdsScreen from './screens/AdsScreen'
import UserScreen from './screens/UserScreen'
import NewAdScreen from './screens/NewAdScreen'
import Admin from './layout/Dashord';

const App = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated())
  const [user, setUser] = useState(getUser() || {})
  const [lang, setLang] = useState(getLang())
  const [recherche, setrecherche] = useState("")
  const [showsidebar, setshowsidebar] = useState(true)
  const onUpdateUser = user => {
    setUser(user)
    persistUser(user)
  }

  const onUpdateLang = lang => {
    setLang(lang)
    persistLang(lang)
    setDocumentLang(lang)
  }

  const setDocumentLang = lang => {
    document.documentElement.lang = lang
    const isEnglish = lang === 'en'
    document.documentElement.dir = isEnglish ? 'ltr' : 'rtl'
    const body = document.querySelector('body')
    body.style['text-align'] = isEnglish ? 'left' : 'right'
  }

  const recherchedate = value => {
    setrecherche(value)
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getProfile()
        const { mobile, name, email, bio, profilePhoto, stats } = user
        onUpdateUser({ name, mobile, email, bio, profilePhoto, stats })
      } catch (ex) {
        //const errorString = ex.message || ex.toString()
      }
    }

    if (!authenticated) return
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  setDocumentLang(lang)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authenticated,
        user,
        lang,
        onChangeState: state => {
          setAuthenticated(state)
        },
        onUpdateUser: onUpdateUser,
        onUpdateLang: onUpdateLang,
        contextchangedata:recherchedate,
        rechercheddate:recherche,
        onupdateside:setshowsidebar,
        updatesilde:showsidebar
      }}
    >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ToastContainer />
        <Header />
        
        
            <Switch>
           
              <Route path="/" component={HomeScreen} exact />
              <Route path="/login" component={LoginScreen} exact />
              <Route
                path="/logout"
                render={({ history }) => {
                  clearLoginData()
                  setAuthenticated(false)
                  // TODO:- Fix header re-rendering
                  history.replace('/')
                }}
              />
              <Route path="/ads/:id" component={AdScreen} />
            
              <Route path="/categories/:id" component={AdsScreen} />
              <Route path="/categories" component={CategoriesScreen} />
         
              <Route path="/block-list" component={BlockedScreen} />
              <Route path="/users/:id" component={UserScreen} />
              <Route path="/new-ad" component={NewAdScreen} />
            
               <Route path="/not-found" component={NotFound} /> 
              
               <Route path="/admin" component={Admin} />
                <Redirect to="/not-found" />  
            </Switch>
           
        
         <Footer /> 
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
