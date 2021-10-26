import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import LoadingButton from './common/LoadingButton'
import { toast } from 'react-toastify'
import { deleteAd } from '../services/myAdsService'
import { t } from '../utils/helper'

const DeleteAdModal = props => {
  const { onHide, onDeleteSucceed, ad } = props
  const [isProcessing, setIsProcessing] = useState(false)

  const onDelete = async () => {
    setIsProcessing(true)
    try {
      const { message } = await deleteAd(ad._id)
      toast.success(message)
      setIsProcessing(false)
      onDeleteSucceed(ad)
      onHide()
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setIsProcessing(false)
    }
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('delete_ad')} ({ad.title})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('are_you_sure')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="text-light" onClick={onHide}>
          {t('close')}
        </Button>
        <LoadingButton
          variant="danger"
          className=""
          isProcessing={isProcessing}
          onClick={onDelete}
        >
          {t('delete')}
        </LoadingButton>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteAdModal
