import React from 'react'
import { Spinner } from 'react-bootstrap'
import { t } from '../utils/helper'

const Loader = ({ isLoading, children }) => {
  if (isLoading)
    return (
      <div className="d-flex justify-content-center p-4">
        <Spinner animation="border" role="status">
          <span className="sr-only">{t('loading')}</span>
        </Spinner>
      </div>
    )

  return children
}

export default Loader
