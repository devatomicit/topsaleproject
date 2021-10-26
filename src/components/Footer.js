import { Button } from 'react-bootstrap'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { t } from '../utils/helper'
import { appstore, googleplay } from '../utils/images'

const Footer = () => {
  return (
    <footer className="bggray p-3">
      {/* <h4 className="lead text-secondary">Copyright &copy; Top Sale</h4> */}
      <Container>
        <Row>
          <Col
            className="text-center d-flex flex-column justify-content-center align-items-center"
            md={4}
          >
            <div className="mb-2">
              <strong>{t('download_app')}</strong>
            </div>
            <div className="m-2">
              <a
                href="https://apps.apple.com/ie/app/top-sale-qatar-%D8%AA%D9%88%D8%A8-%D8%B3%D9%8A%D9%84/id1161177948"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={appstore} alt="app store" />
              </a>
            </div>
            <div className="m-2">
              <a
                href="https://play.google.com/store/apps/details?id=qa.topsale"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={googleplay} alt="google play" />
              </a>
            </div>
          </Col>

          <Col>
            <p
              className="text-center card shadow-sm p-3 m-2"
              style={{ whiteSpace: 'pre-line' }}
            >
              {t('footer_conditions')}
            </p>

            <div
              md={1}
              className="text-center d-flex flex-row justify-content-center align-items-center mt-1"
            >
              {/* Facebook */}
              <Button
                href="https://www.facebook.com/topsale.qa"
                className="m-1 btnicon"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>

              {/* Twitter */}
              <Button
                href="https://twitter.com/topsale.qa"

                className="m-1 btnicon"
              >
                <i className="fab fa-twitter-square"></i>
              </Button>

              {/* Instagram */}
              <Button
                href="https://www.instagram.com/topsale.qa"
                className="m-1 btnicon"
              >
              <i class="fab fa-instagram"></i>
              </Button>

              {/* Snap */}
              <Button
                href="https://www.snapchat.com/add/topsale.qa"

                className="m-1 btnicon"
              >
                <i className="fab fa-snapchat-square"></i>
              </Button>

              {/* Call */}
              <Button href="tel:+97466466622" className="m-1 btnicon">
                <i className="fas fa-phone-alt"></i>
              </Button>

              {/* Email */}
              <Button
                href="mailto:info@topsale.email"
            
                className="m-1 btnicon"
              >
                <i className="fas fa-envelope"></i>
              </Button>
            </div>
          </Col>
        </Row>

        <Row></Row>

        <hr />
        <Row>
          <Col className="text-center">Copyright &copy; Top Sale</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
