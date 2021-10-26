import React from 'react'
import { Card } from 'react-bootstrap'
import { t } from '../utils/helper'

const AdPrivacyNote = () => {
  return (
    <Card className="bg-light p-3 my-3">
      <Card.Header className="text-center text-danger">
        <strong>{t('safety_tips_title')}</strong>
      </Card.Header>

      <Card.Body
        className="text-danger text-justify"
        style={{ whiteSpace: 'pre-line' }}
      >
        {t('safety_tips_body')}
      </Card.Body>
    </Card>
  )
}

export default AdPrivacyNote
