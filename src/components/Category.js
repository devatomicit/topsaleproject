import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'
import { logo } from '../utils/images'

const Category = ({ category }) => {
  const { lang } = useContext(AuthContext)

  return (
    <Link to={`/categories/${category._id}`} className="link-categ">
      <Card className="rounded my-3 bg-light shadow-sm card-categ"     style={{
          backgroundImage: 'url('+category.image || logo +')',
          backgroundSize: "cover",
          height: "180px",
          color: "#000",
     
        }}>
      
          <Card.Subtitle className="text-right mt-2 footer-title-categ" style={{background: "#00000052"}}>
            <p className="mr-2 mt-2 text-white title-categ">{category.title[lang]}</p>
          </Card.Subtitle>
        
      </Card>
    </Link>
  )
}

export default Category
