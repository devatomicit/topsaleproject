import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { t } from '../utils/helper'

const NewAdConfirmModal = ({ onProceed, onHide, ...additionalData }) => {
  return (
    <Modal
      onHide={onHide}
      {...additionalData}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('confirmation')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('proceed_without_photos')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="text-light" onClick={onHide}>
          {t('close')}
        </Button>
        <Button onClick={onProceed}>{t('proceed')}</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewAdConfirmModal
