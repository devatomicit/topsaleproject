import React, { useState, useContext } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Ad from './Ad'
import LoadingButton from './common/LoadingButton'
import { toast } from 'react-toastify'
import { republishAd, toggleAdActivation } from '../services/myAdsService'
import { t } from '../utils/helper'
import AuthContext from '../contexts/AuthContext'

const MyAd = ({
  ad,
  onDelete,
  onEdit,
  onRepublishSucceed,
  onToggleActivationSucceed,
}) => {
  const { lang } = useContext(AuthContext)

  const [isProcessingRepublish, setIsProcessingRepublish] = useState(false)
  const [isTogglingActivation, setIsTogglingActivation] = useState(false)

  const onRepublish = async () => {
    try {
      setIsProcessingRepublish(true)
      const { ad: updatedAd, message } = await republishAd(ad._id)
      toast.success(message)
      setIsProcessingRepublish(false)
      onRepublishSucceed(updatedAd)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setIsProcessingRepublish(false)
    }
  }

  const onToggleActivation = async () => {
    try {
      setIsTogglingActivation(true)
      const { ad: updatedAd, message } = await toggleAdActivation(
        ad._id,
        ad.isActive
      )
      toast.success(message)
      setIsTogglingActivation(false)
      onToggleActivationSucceed(updatedAd)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setIsTogglingActivation(false)
    }
  }

  return (
   
    <Ad ad={ad}>
      {/* Status */}
      <Card
        className={`p-2 my-2 text-center ${
          ad.isEnabled
            ? 'border-success text-success'
            : 'border-danger text-danger'
        }`}
      >
        <strong>{t(`ad_status_${ad.status}`)}</strong>
      </Card>

      {/* Reject Reason */}
      {ad.rejectReason && (
        <Card className="p-2 my-2 text-center border-danger text-danger">
          {ad.rejectReason[lang]}
          <br />
          {t('rejection_message_after')}
        </Card>
      )}

      <Row className="mt-3">
        <Col xs={6} className="p-1">
          {/* Delete Button */}
          <Button
            onClick={() => onDelete(ad)}
            className="w-100"
            variant="danger"
          >
            <i class="fas fa-trash"></i> {t('delete')}
          </Button>
        </Col>
        <Col xs={6} className="p-1">
          {/* Edit Button */}
          <Button
            onClick={() => onEdit(ad)}
            className="w-100"
            variant="primary"
          >
            <i class="fal fa-edit"></i> {t('edit')}
          </Button>
        </Col>
        <Col xs={6} className="p-1">
          {/* Republish Button */}
          <LoadingButton
            isProcessing={isProcessingRepublish}
            disabled={!ad.canRepublish}
            onClick={onRepublish}
            className="w-100"
            variant="primary"
          >
            {t('republish')}
          </LoadingButton>
        </Col>
        <Col xs={6} className="p-1">
          {/* Toggle Activation Button */}
          <LoadingButton
            isProcessing={isTogglingActivation}
            onClick={onToggleActivation}
            className="w-100"
            variant={ad.isActive ? 'primary' : 'outline-primary'}
          >
            {ad.isActive ? t('deactivate') : t('activate')}
          </LoadingButton>
        </Col>
      </Row>
    </Ad>
 
  )
}

export default MyAd
