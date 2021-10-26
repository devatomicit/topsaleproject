import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import AdPhotos from './AdPhotos'
import { t } from '../utils/helper'
import Moment from 'react-moment'
import AuthContext from '../contexts/AuthContext'

const AdMainContent = ({ ad }) => {
  const { lang } = useContext(AuthContext)
  const { title, price, details, viewsCount, commentsCount, likesCount } = ad

  return (
    <Card className="bg-light p-3 mb-3">
      <Card className="text-center p-2 bg-white shadow-sm mb-2">
        {/* Title */}
        <h1 className="h3 text-body">
          <strong>{title}</strong>
        </h1>

        {/* Price */}
        <div className="h5 text-primary">
          <strong>
            {price} {t('curr')}
          </strong>
        </div>

        {/*  */}
      </Card>

      {/* Stats */}
      <div className="d-flex flex-row justify-content-between mb-2">
        <div className="text-left" dir="ltr">
          <Moment format="D-MMM-YYYY" locale={lang}>
            {ad.publishedAt}
          </Moment>
        </div>

        <div>
          <span className="p-2">
            <i className="fas fa-eye"></i> {viewsCount}
          </span>
          <span className="p-2">
            <i className="fas fa-comment-alt"></i> {commentsCount}
          </span>
          <span className="p-2">
            <i className="fas fa-thumbs-up"></i> {likesCount}
          </span>
        </div>
      </div>

      {/* Photos */}
      <AdPhotos ad={ad} />

      <Card className="text-center my-3 p-2">
        <Card.Header>
          <strong>{t('ad_details')}</strong>
        </Card.Header>

        <Card.Body>
          <p>{details}</p>
        </Card.Body>
      </Card>
    </Card>
  )
}

export default AdMainContent
