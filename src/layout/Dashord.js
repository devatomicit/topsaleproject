import React , {useContext} from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Slider from '../components/Sidebar'
import NotFound from '../screens/NotFound'
import MyAdsScreen from '../screens/MyAdsScreen'
import FavAdsScreen from '../screens/FavAdsScreen'
import FollowersScreen from '../screens/FollowersScreen'
import FollowingsScreen from '../screens/FollowingsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import BlockedScreen from '../screens/BlockedScreen'
import AdminCategory from '../screens/admincategory'
import AdminUser from '../screens/adminuser'
import AdminRegion from '../screens/adminregion'
import AdminBanner from '../screens/adminbanner'
import Adminstatestique  from '../screens/Adminstatestique'
import Adminnotification from '../screens/notifications/NotificationsPage'
import Addallnotice from '../screens/notifications/CreatallNotice'
import onenotice from '../screens/notifications/Createusernotice'
import adminrepport from '../screens/adminrepport'
import Adminads from '../screens/adminads'
import Admintopbanner from '../screens/topbanner/index'
import AuthContext from '../contexts/AuthContext'
import Maincat from '../screens/adminmaincategory'
import Sortmaincategory from '../screens/adminmaincategory/sortmaincategory'
import {decodetoken} from '../utils/helper'
const Admin = () => {
  const {updatesilde,onupdateside } = useContext(AuthContext)



  return (

  <div className="container-fluid no-gutters p-0 h-100">
     <div className={!updatesilde?"d-none":"d-block d-sm-none general-backdrop"} onClick={()=>onupdateside(false)}></div> 
    <div className="d-flex">
          <Slider/>
          <div className="main-dashbord">
          <div className="scroll">
             <Switch>
             <Route  path="/admin/statestique" component={Adminstatestique} />
              <Route  path="/admin/my-ads" component={MyAdsScreen} />
              <Route   path="/admin/fav-ads" component={FavAdsScreen} />
              <Route    path="/admin/followers" component={FollowersScreen} />
              <Route   path="/admin/followings" component={FollowingsScreen} />
              <Route    path="/admin/profile" component={ProfileScreen} />
              <Route   path="/admin/block-list" component={BlockedScreen} />
              {decodetoken().isAdmin && <>
              <Route path="/admin/maincategory" component={Maincat} />
              <Route path="/admin/sortcategory" component={Sortmaincategory} />
              <Route   path="/admin/category" component={AdminCategory} />
              <Route   path="/admin/region" component={AdminRegion} />
              <Route   path="/admin/banner" component={AdminBanner} />
              <Route   path="/admin/users" component={AdminUser} />
              <Route   path="/admin/repport" component={adminrepport} />
              <Route   path="/admin/notification" component={Adminnotification} />
              <Route path="/admin/allnotice" component={Addallnotice} />
              <Route path="/admin/createusernotice" component={onenotice} />
              <Route path="/admin/allads" component={Adminads} />
              <Route path="/admin/topbanner" component={Admintopbanner} />
              </>}
               <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />  
            </Switch> 
            </div>
            </div>
            </div>
            </div>
        

    
  )
}

export default Admin
