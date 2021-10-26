import React, { useState, useEffect } from 'react'
import {Row, Carousel } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getTopBanners, getRecentAds } from '../services/homeService'
import TopBanner from '../components/TopBanner'
import Loader from '../components/Loader'
import AdsList from '../components/AdsList'
import { t } from '../utils/helper'
import EmptyView from '../components/EmptyView'
import { Container } from 'react-bootstrap'
import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HomeScreen = () => {
  const [ads, setAds] = useState([])
  const [topBanners, setTopBanners] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const topBanners = await getTopBanners()
        const ads = await getRecentAds()
        setTopBanners(topBanners)
        setAds(ads)
        setIsLoading(false)
      } catch (ex) {
        const errorString = ex.message || ex.toString()
        toast.error(errorString)
        setError(errorString)
        setIsLoading(false)
      }
    }

    setAds([])
    setIsLoading(true)
    fetchData()
  }, [])
  
  
  return (
    <div className="d-flex justify-content-center alight-items-center py-2 pageHome">
      <Container className="py-3">
        <Loader isLoading={isLoading}>
          <Carousel>
            <Carousel.Item interval={6000}>
              <img
                className="d-block w-100"
                src="annonce.jpg"
                alt="First slide"
                height="300px"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3500}>
              <img
                className="d-block w-100"
                src="annonce2.jpg"
                alt="Second slide"
                height="300px"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="annonce3.jpg"
                alt="Third slide"
                height="300px"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          {/* <Jumbotron className="text-center p-3 my-2 shadow-sm card">
            <div className="d-flex justify-content-between align-items-center flex-rows">
              <strong>{t('home_subtitle')}</strong>
              <Link to="/categories">
                <Button style={{ minWidth: '130px' }}>{t('categories')}</Button>
              </Link>
            </div>
          </Jumbotron> */}

          <Row dir="ltr">
            {/*// <Col key={banner._id} xs={6} sm={4} md={3} lg={3}> */}
                  {/* // </Col> */}
            <OwlCarousel className='owl-theme' loop margin={10} >
              {topBanners.map(banner => (
                <div class="item">
                  <TopBanner banner={banner} />
                  </div>
          
              ))}
            </OwlCarousel>
          </Row>

          <EmptyView isEmpty={!isLoading && error} message={error || t('no_data')}>
            <hr/>
            {/* <h3 className="border-bottom pb-3 my-2">{t('recent_ads')}</h3> */}
            <AdsList ads={ads}/>
          </EmptyView>
        </Loader>
      </Container>
    </div>
  )
}

export default HomeScreen
