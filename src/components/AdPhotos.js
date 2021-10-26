import React from 'react'
import { Carousel } from 'react-bootstrap'
import { logo } from '../utils/images'

const AdPhotos = ({ ad }) => {
  const { photos, title } = ad
  return (
    <>
      {photos && photos.length > 0 ? (
        <Carousel
          className="p-2"
          indicators={false}
          controls={photos.length > 1}
        >
          {photos.map(photo => (
            <Carousel.Item key={photo._id}>
              <img
                style={{ objectFit: 'contain', maxHeight: '350px' }}
                className="d-block w-100"
                src={photo.org}
                alt={title}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <img
          className="d-block w-100"
          height={350}
          style={{ objectFit: 'contain' }}
          src={logo}
          alt={title}
        />
      )}
    </>
  )
}

export default AdPhotos
