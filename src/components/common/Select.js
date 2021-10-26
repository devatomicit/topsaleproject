import React from 'react'
import { Form } from 'react-bootstrap'

const Select = ({
  name,
  label,
  options,
  error,
  allTitle = 'All',
  all = true,
  ...rest
}) => {
  return (
    <Form.Group controlId="formName">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="select"
        name={name}
        {...rest}
        className={error && 'border-danger'}
      >
        {all && <option value="">{allTitle}</option>}
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </Form.Control>
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  )
}

export default Select
