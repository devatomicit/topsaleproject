import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Follower = ({ user, children }) => {
  return (
    <Card className="rounded my-3 bg-light shuserow">
      <Card.Body>
        <Link to={`/users/${user._id}`}>
          <Card.Title className="one-line">
            <strong>{user.name}</strong>
          </Card.Title>
        </Link>
        <Card.Subtitle>
          <strong>{user.mobile}</strong>
        </Card.Subtitle>
        {children && <div className="pt-3">{children}</div>}
      </Card.Body>
    </Card>
  )
}

export default Follower
