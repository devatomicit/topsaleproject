import React from 'react'
import { Button, Card,OverlayTrigger,Popover,Tooltip  } from 'react-bootstrap'
import { t } from '../utils/helper'


const ShareAdSide = ({ad}) => {
  const shareLink = `https://topsale.qa/ads/${ad._id}`

  return (
    <Card className="text-center bg-light p-3 my-3">
      <div className="mb-2">
        <strong>{t('share_ad')}</strong>
      </div>
      <div>
        {/* Share Facebook */}
        <Button
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
        
          className="mx-1 btnicon"
        >
          <i className="fab fa-facebook-square"></i>
        </Button>

        {/* Share Twitter */}
        <Button
          href={`https://twitter.com/intent/tweet?url=${shareLink}`}
       
          className="mx-1 btnicon"
        >
          <i className="fab fa-twitter-square"></i>
        </Button>

        {/* Copy Link */}
       
  
     
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">copid!</Tooltip>}>
        <Button
           onClick={() => {
             navigator.clipboard.writeText(shareLink)
           }}
          titel="copied"
      
          className="mx-1 btnicon"
        >
          <i className="fas fa-link"></i>
        </Button>
        </OverlayTrigger>
    

      </div>
    </Card>
  )
}

export default ShareAdSide
