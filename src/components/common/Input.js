import React from 'react'
import { Form } from 'react-bootstrap'

const Input = ({ name, label, error, ...rest }) => {
  return (
    <Form.Group controlId="formName">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        name={name}
        {...rest}
        className={error && 'border-danger'}
      />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  )
}

export default Input
