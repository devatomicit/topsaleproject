import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col className="mx-auto card bg-light py-4 my-5 shadow-sm">
          <h1 className="text-center h3 text-secondary">404 Not Found</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
