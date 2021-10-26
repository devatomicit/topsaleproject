import React, { useState, useEffect,useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { t ,getLang} from '../utils/helper'
import {
  Badge,
  Image,
  Dropdown
} from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'
import { logo } from '../utils/images'
import {decodetoken} from '../utils/helper'
function Sidebar({ show }) {
  const {  i18n } = getLang();
  let history = useHistory();
  const {updatesilde, user} = useContext(AuthContext)
  const [statelangage, setstatelangage] = useState("");
  const deconextion = () => {
    localStorage.clear();
    history.push("/logout");
  };
  useEffect(() => {
    setstatelangage(i18n);
  }, [i18n]);
  return (
    <div className={!updatesilde ? "d-none d-sm-block sidebar" : "d-block sidebar"}>
   
      <div className="pro-sidebar md ">
        <div className="pro-sidebar-inner ">
          <div className="pro-sidebar-layout">
           
            <Dropdown >
            <div className="dropdown m-2">
  <Dropdown.Toggle  id="dropdown-basic" className="btn-toggle-sidebar">
              <div className="d-flex justify-content-evenly align-items-center "
              
              >
             <Image
                      roundedCircle
                      src={user.profilePhoto || logo}
                      width={60}
                      height={60}
                      alt="user profile photo"
                    />
                <div className="ml-3 mt-1 d-flex align-items-center">
                  <div className="with-150">
                   <p className="mt-2">{user.mobile}</p> 
                   <p className="text-dark font-sizetitel "> {user.name}</p> 
                 </div>
              <i className="far fa-chevron-down ml-3 pl-1  mr-1 font-weight-bold"></i>
                 
                </div>
              </div>
</Dropdown.Toggle>

<Dropdown.Menu className="widthdropdown">
<Dropdown.Item>
                <NavLink
                  exact
                  className="colorsubmenu"
                  activeClassName="active"
                  to="/admin/profile"
                >
                  
                  {" "}
                  
                  <i className="fas fa-user pl-2 mr-2"></i>{" "}
                  {t('profile')}{" "}
                
                </NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                <p onClick={deconextion} className="colorsubmenu">
               
                  <i className="fal fa-sign-out pl-2 mr-2"></i>{" "}
                  {t('logout')}{" "}
                </p>
                </Dropdown.Item>
           
       
</Dropdown.Menu>
</div>
</Dropdown>

            <hr className="m-2" />
            <div className="section">
              <div className="ml-2">
                <p className="labelslider  mt-2">
                  {t("Dshobrd")}
                </p>
                <NavLink
                 className="colorsubmenu  d-flex"
                 exact
                 activeClassName="active"
                to='/admin/statestique'
                >
                  <i class="fas fa-tachometer-slow pl-2 mr-2"></i>
                  {t("sidebar.statestique")}
                  </NavLink>
                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/my-ads"
                >
                  <div className="d-flex justify-content-between">
                  <p><span className="pl-2 mr-2  fad fa-megaphone"></span>{" "}
                  {t('my_ads')}{" "} </p>
                   <p>    <Badge variant="primary">
                       {(user.stats && user.stats.adsCount) || 0}
                     </Badge>
                     </p>
                     </div>
                </NavLink>
                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/fav-ads"
                >
                  <div className="d-flex justify-content-between">
                 <p> <span className="far fa-heart pl-2 mr-2 "></span>{" "}
                  {t('favorite')}{" "} </p>
                 <p> <Badge variant="primary">
                        {(user.stats && user.stats.favAdsCount) || 0}
                     </Badge>
                     </p>
                     </div>
                </NavLink>
                
                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/block-list"
                >
                  <div className="d-flex justify-content-between">
                  <p><i className="fas fa-user-slash pl-2 mr-2"></i>{" "}
                  {t('block_list')}{" "}
                  </p>
                    <p>  <Badge variant="primary">
                        {(user.stats && user.stats.blocksCount) || 0}
                     </Badge>
                     </p>
                     </div>
                </NavLink>
               
                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/followings"
                >
                  <div className="d-flex justify-content-between">
                  <p><span className="fad fa-user-plus pl-2 mr-2"></span>{" "}
                  {t('followings')}
                  </p>
                  <p> <Badge variant="primary">
                         {(user.stats && user.stats.followingsCount) || 0}
                       </Badge>
                       </p>
                       </div>
                </NavLink>
              
                <NavLink
                  className="colorsubmenu "
                  exact
                  activeClassName="active"
                  to="/admin/followers"
                >
                  <div className="d-flex justify-content-between">
                  <p><span className="fas fa-users pl-2 mr-2"></span>{" "}
                  {t('followers')}
                  </p>
                        <p><Badge variant="primary">
                         {(user.stats && user.stats.followersCount) || 0}
                       </Badge></p>
                       </div>
                </NavLink>
                
              </div>
              <hr className="m-2" />
              {decodetoken().isAdmin && <>
              <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/allads"
                >
                  <span className="far fa-th-large pl-2 mr-2"></span>{" "}
                  {t('sidebar.allads')}
                </NavLink>
                <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/maincategory"
                >
                  
                  <span className="far fa-home-lg pl-2 mr-2"></span>{" "}
                  {t('sidebar.maincategory')}
                </NavLink>
                
              <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/category"
                >
                  <span className="far fa-th-large pl-2 mr-2"></span>{" "}
                  {t('sidebar.allcategory')}
                </NavLink>
                
                <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/region"
                >
                 
                  <span className="fal fa-map-marked-alt pl-2 mr-2"></span>{" "}
                  {t('sidebar.allregion')}
                </NavLink>
                <NavLink
                className="colorsubmenu d-flex"
                exact
                activeClassName="active"
                to="/admin/topbanner"
                >
               
                     <span className="far fa-image pl-2 mr-2"></span>{" "}
                  {t('sidebar.alltopbanner')}
                  </NavLink>
                <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/banner"
                >
                  <span className="far fa-photo-video pl-2 mr-2"></span>{" "}
                  {t('sidebar.allbanner')}
                </NavLink>
                <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/users"
                >
               
                  <span className=" fal fa-users-cog  pl-2 mr-2"></span>{" "}
                  {t('sidebar.alluser')}
                </NavLink>
                <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/repport"
                >
                 
                  <span className="far fa-file-chart-line pl-2 mr-2"></span>{" "}
                  {t('sidebar.repport')}
                </NavLink>
                <NavLink
                  className="colorsubmenu d-flex"
                  exact
                  activeClassName="active"
                  to="/admin/notification"
                >
                 
                  <span className="far fa-bells pl-2 mr-2"></span>{" "}
                  {t('sidebar.notification')}
                </NavLink>
                </>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
