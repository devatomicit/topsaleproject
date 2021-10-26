import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { t } from '../../utils/helper'

const LoadingButton = ({
  label,
  isProcessing,
  disabled,
  type,
  onClick,
  variant = 'primary',
  children,
  className = 'w-100',
  ...additional
}) => {
  return (
    <Button
      {...additional}
      disabled={disabled || isProcessing}
      className={className}
      variant={variant}
      type={type}
      onClick={onClick}
    >
      {isProcessing ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        >
          <span className="sr-only">{t('loading')}</span>
        </Spinner>
      ) : (
        label || children
      )}
    </Button>
  )
}

export default LoadingButton
