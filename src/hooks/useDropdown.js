import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const useDropdown = (
  label,
  defaultState,
  options,
  allTitle,
  { showLabel = false, error } = {}
) => {
  const [state, setState] = useState(defaultState)
  const id = `useDropdown_${label}`

  // options [ {value, title} ]
  const Dropdown = () => (
    <Form.Group key={id} controlId={id}>
      {showLabel && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="select"
        value={state}
        disabled={options.length === 0}
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
        // className={error && 'border-danger'}
      >
        {allTitle && <option value="">{allTitle}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </Form.Control>
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
      {/* <Form.Text className="text-danger px-2">Required</Form.Text> */}
    </Form.Group>
  )

  return [state, Dropdown, setState]
}

export default useDropdown
