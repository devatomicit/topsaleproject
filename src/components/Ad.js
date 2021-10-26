import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'react-bootstrap'
import Tip from './common/Tip'
import { t } from '../utils/helper'
import AuthContext from '../contexts/AuthContext'
import { logo } from '../utils/images'
import {isAuthenticated} from '../utils/helper';
const Ad = ({ ad, children, display = 'grid' }) => {
 
  return display === 'grid' ? (
    <AdGrid ad={ad}>{children}</AdGrid>
  ) : (
    <AdMenu ad={ad}>{children}</AdMenu>
  )
}

const AdGrid = ({ ad, children }) => {
  return (
    <Tip tip={ad.title}>
      <Card className="rounded my-2 bg-light shadow-sm cardAds">
        <Link to={`/ads/${ad._id}`} className="linkImgAds">
          <Card.Img
            src={ad.photos && ad.photos.length > 0 ? ad.photos[0].thumb : logo}
            variant="top"
            className="imgAds"
          />
        </Link>

        <Card.Body className="bodyAds">
          <Link to={`/ads/${ad._id}`} className="linkfooterads">
            <Card.Title className="ad-grid-title one-line titleads">
              <strong>{ad.title}</strong>
            </Card.Title>
          </Link>
          <Card.Subtitle>
            <strong className="priceAds">
              {ad.price} {t('curr')}
            </strong>
          </Card.Subtitle>
        
          {isAuthenticated() &&<Card className="my-3 p-2 text-center shadow-sm d-block baground_transaparant border-raduis">
            <span className="mx-2">
              <i className="fal fa-comments-alt"></i> {ad.commentsCount}
            </span>
            <span className="mx-2">
            <i class="far fa-thumbs-up"></i> {ad.likesCount}
            </span>
                   
          </Card>
               }
          {children && <>{children}</>}
        </Card.Body>
      </Card>
    </Tip>
  )
}

const AdMenu = ({ ad, children }) => {
  const { lang } = useContext(AuthContext)

  return (
    <Tip tip={ad.title}>
      <Card className="rounded my-2 bg-light shadow-sm d-flex flex-row">
        <Link to={`/ads/${ad._id}`}>
          <Image
            src={ad.photos && ad.photos.length > 0 ? ad.photos[0].thumb : logo}
            width={150}
            height={150}
          />
        </Link>

        <div className="ad-menu-content px-3 pt-3">
          <Link to={`/ads/${ad._id}`}>
            <div className="ad-menu-title one-line">
              <strong>{ad.title}</strong>
            </div>
          </Link>
          <div>
            <strong>
              {ad.price} {t('curr')}
            </strong>
          </div>
          <div className="ad-menu-details one-line">{ad.details}</div>

          {isAuthenticated() && <div className="my-3 text-center d-flex flex-row justify-content-start">
            <span className={lang === 'en' ? 'mr-2' : 'ml-2'}>
              <i className="fas fa-comment-alt"></i> {ad.commentsCount}
            </span>
            <span className="mx-2">
              <i className="fas fa-thumbs-up"></i> {ad.likesCount}
            </span>
            <span className="mx-2">
              <i className="fas fa-eye"></i> {ad.viewsCount}
            </span>
          </div> }
                  

          {children && <>{children}</>}
        </div>
      </Card>
    </Tip>
  )
}

export default Ad
