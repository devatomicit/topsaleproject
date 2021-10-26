import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'
import { logo } from '../utils/images'

const TopBanner = ({ banner }) => {
  const { lang } = useContext(AuthContext)

  let link = '/'
  if (banner.category) link = `/categories/${banner.category._id}`
  else if (banner.ad) link = `/ads/${banner.ad._id}`
  else if (banner.url) link = banner.url

  return (
    // <a href={link} target="_blank" rel="noopener noreferrer">
    <Link to={link} className="link-categ">
      <Card className="rounded my-3 bg-light shadow-sm card-categ"   style={{
          backgroundImage: 'url('+banner.photo || logo +')',
          backgroundSize: "cover",
          backgroundRepeat:"no-repeat",
          height: "200px",
          color: "#000",
     
        }}>
      

        <Card.Body className="body-categ">
          <Card.Title as="h6" style={{background: "#00000052",padding:"5px"}} className="title-categ">
            <strong className="text-white p-3">{banner.title[lang]}</strong>
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  )
}

export default TopBanner
