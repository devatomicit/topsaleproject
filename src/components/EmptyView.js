import React from 'react'

const EmptyView = ({ isEmpty, message = 'No data', children }) => {
  if (isEmpty)
    return (
      <div className="d-flex justify-content-center mt-5 p-5">
        <div className="h5 text-secondary">{message}</div>
      </div>
    )

  return children
}

export default EmptyView
