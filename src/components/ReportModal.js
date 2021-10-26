import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Input from './common/Input'
import LoadingButton from './common/LoadingButton'
import { toast } from 'react-toastify'
import { reportAd } from '../services/adsService'
import { t } from '../utils/helper'

const ReportModal = props => {
  const { onHide, adId } = props

  const [text, setText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const onSubmit = async () => {
    setIsProcessing(true)
    try {
      const { message } = await reportAd(adId, text)
      toast.success(message)
      setText('')
      setIsProcessing(false)
      onHide()
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
    }
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t('report_ad')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            name="text"
            value={text}
            label={t('reason')}
            onChange={e => setText(e.target.value.trimStart())}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="text-light" onClick={onHide}>
          {t('close')}
        </Button>
        <LoadingButton
          className=""
          isProcessing={isProcessing}
          disabled={!text}
          onClick={onSubmit}
        >
          {t('send')}
        </LoadingButton>
      </Modal.Footer>
    </Modal>
  )
}

export default ReportModal
