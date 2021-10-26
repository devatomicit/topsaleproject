import React, { useContext  } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Navbar,
  Nav,
  Container,
  Image,
} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { t } from '../utils/helper'
import { logo } from '../utils/images'
import {
 
  useLocation
} from "react-router-dom";
const Header = (props) => {
  let location = useLocation();
  const { isAuthenticated,rechercheddate, user,contextchangedata, lang, onUpdateLang , onupdateside } = useContext(AuthContext)

  return (
    <header>
      <Navbar
        id="mainNav"
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/" exact>
            <Navbar.Brand className="px-2">
              <Image
                className="shadow-sm"
                rounded
                src={logo}
                alt="logo"
                height={40}
              />
              {/* {t('app_name')} */}
            </Navbar.Brand>
          </LinkContainer>
          <i className="fas fa-plus text-white d-block d-sm-none cursor-pointer" onClick={() =>onupdateside(true)}></i>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={lang === 'en' ? 'mr-auto' : 'ml-auto'}>
              <LinkContainer to="/categories">
                <Nav.Link><i className="fal fa-th-large"></i> {" "}{t('categories')}</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/new-ad">
                <Nav.Link><i className="fal fa-camera-alt"></i> {" "}{t('new_ad')}</Nav.Link>
              </LinkContainer>

              {/* <NavDropdown title={t('contact_us')} id="basic-nav-dropdown">
                <NavDropdown.Item
                  href="tel:+97466466622"
                  className="text-center"
                >
                  +97466466622
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="mailto:info@topsale.email"
                  className="text-center"
                >
                  info@topsale.email
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          <Nav>
          {location.pathname==="/" &&   <div className="bordergray d-flex ">
            <div className="input-group-prepend bg-white">
            <span className="bagroundtransparant p-2">
               <i className="fal fa-search"></i>
               </span>
               </div>
                <input style={{width:"350px"}} type="text" value={rechercheddate} onChange={(event) => contextchangedata(event.target.value)}   className="width border-0" placeholder={t("home_recherche")}></input>
                </div>
}   
           
            </Nav>
            <Nav className={lang === 'en' ? 'ml-auto' : 'mr-auto'}>
              {lang === 'en' ? (
                <Nav.Link onClick={() => onUpdateLang('ar')}>عربي</Nav.Link>
              ) : (
                <Nav.Link onClick={() => onUpdateLang('en')}>English</Nav.Link>
              )}
                  
              {isAuthenticated ? (
                  <Nav.Link>      
                <Link className="text-white" to="/admin/profile">
                
                  {t('profile')}
                </Link>
              </Nav.Link>
                // <NavDropdown
                //   title={user.name || 'User'}
                //   id="basic-nav-dropdown"
                // >
                //   <div className="text-center p-2">
                    
                //     <div className="mt-2">{user.mobile}</div>
                //   </div>

                //   <NavDropdown.Divider />

                //   <LinkContainer to="/admin/profile">
                //     <NavDropdown.Item className="text-center">
                //       {t('profile')}
                //     </NavDropdown.Item>
                //   </LinkContainer>

                //   <NavDropdown.Divider />

                //   <LinkContainer to="/admin/my-ads">
                //     <NavDropdown.Item className="d-flex align-items-center justify-content-between">
                //       {t('my_ads')}
                //       <Badge variant="primary">
                //         {(user.stats && user.stats.adsCount) || 0}
                //       </Badge>
                //     </NavDropdown.Item>
                //   </LinkContainer>

                //   <LinkContainer to="/admin/fav-ads">
                //     <NavDropdown.Item className="d-flex align-items-center justify-content-between">
                //       {t('favorite')}
                //       <Badge variant="primary">
                //         {(user.stats && user.stats.favAdsCount) || 0}
                //       </Badge>
                //     </NavDropdown.Item>
                //   </LinkContainer>

                //   <LinkContainer to="/admin/block-list">
                //     <NavDropdown.Item className="d-flex align-items-center justify-content-between">
                //       {t('block_list')}
                //       <Badge variant="primary">
                //         {(user.stats && user.stats.blocksCount) || 0}
                //       </Badge>
                //     </NavDropdown.Item>
                //   </LinkContainer>

                //   <NavDropdown.Divider />

                //   <LinkContainer to="/admin/followings">
                //     <NavDropdown.Item className="d-flex align-items-center justify-content-between">
                //       {t('followings')}
                //       <Badge variant="primary">
                //         {(user.stats && user.stats.followingsCount) || 0}
                //       </Badge>
                //     </NavDropdown.Item>
                //   </LinkContainer>

                //   <LinkContainer to="/admin/followers">
                //     <NavDropdown.Item className="d-flex align-items-center justify-content-between">
                //       {t('followers')}
                //       <Badge variant="primary">
                //         {(user.stats && user.stats.followersCount) || 0}
                //       </Badge>
                //     </NavDropdown.Item>
                //   </LinkContainer>

                //   <NavDropdown.Divider />

                //   <LinkContainer to="/logout">
                //     <NavDropdown.Item className="text-center">
                //       {t('logout')}
                //     </NavDropdown.Item>
                //   </LinkContainer>
                // </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>{t('login')}</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
