import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const Tip = ({ tip, children }) => {
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{tip}</Tooltip>}>
      {children}
    </OverlayTrigger>
  )
}

export default Tip
