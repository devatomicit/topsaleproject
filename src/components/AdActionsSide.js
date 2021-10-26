import React from 'react'
import { Card, Button } from 'react-bootstrap'
import LoadingButton from './common/LoadingButton'
import { t } from '../utils/helper'

const AdActionsSide = ({
  ad,
  isProcessingLike,
  onToggleLike,
  isProcessingFavorite,
  onToggleFavorite,
  onReport,
}) => {
  return (
    <Card className="bg-light p-3 my-3">
      {/* Like Button */}
      <LoadingButton
        variant={ad.isLiked ? 'primary' : 'outline-primary'}
        isProcessing={isProcessingLike}
        onClick={onToggleLike}
        className="mb-2"
      >
        {ad.isLiked ?<span><i className="fal fa-thumbs-down"></i> {" "}{ t('dislike')}</span> :<span><i className="fal fa-thumbs-up"></i> {" "}{ t('like')}</span>}
      </LoadingButton>

      {/* Favorite Button */}
      <LoadingButton
        variant={ad.isFavourite ? 'primary' : 'outline-primary'}
        isProcessing={isProcessingFavorite}
        onClick={onToggleFavorite}
        className="mb-2"
      >
        {ad.isFavourite ? <span><i className="fal fa-unlink"></i> {" "}{t('unfav')}</span> : <span><i className="fal fa-heart"></i> {" "}{t('fav')}</span>}
      </LoadingButton>

      <Button onClick={onReport} variant="warning" className="mb-2">
        {t('report')}
      </Button>
    </Card>
  )
}

export default AdActionsSide
