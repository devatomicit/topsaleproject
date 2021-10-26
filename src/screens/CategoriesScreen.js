import React, { useState, useEffect,useContext } from 'react'
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getgrouped } from '../services/categoriesService'
import Category from '../components/Category'
import Loader from '../components/Loader'
import { t } from '../utils/helper'
import AuthContext from '../contexts/AuthContext'
import EmptyView from '../components/EmptyView'
import { Container } from 'react-bootstrap'
const CategoriesScreen = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { lang } = useContext(AuthContext)
  useEffect(() => {
    async function fetchData() {
      try {
        //const categories = await getgrouped()
        getgrouped()
        .then(res => {
        setCategories(res.data.data)
        setIsLoading(false)
        }
        )
      } catch (ex) {
        const errorString = ex.message || ex.toString()
        toast.error(errorString)
        setError(errorString)
        setIsLoading(false)
      }
    }

    setCategories([])
    setIsLoading(true)
    fetchData()
  }, [])

  return (
    <div className="d-flex justify-content-center alight-items-center py-2 page-categ">
      <Container className="py-3">
        <Loader isLoading={isLoading}>
          <h3 className="border-bottom pb-3 mb-3 title-page-categ">{t('categories')}</h3>
          <EmptyView isEmpty={!isLoading && error} message={error || t('no_data')}>
            <Row className="row-categ">
              {categories.map(category => (
                <>
                <Col xs={12} className="column-parent-categ">
                  <h3 className="title-parent-categ">
                    {category.title[lang]}
                  </h3> 
                </Col>
                {category.categories.map(el => {
                  return (
                  <Col key={el._id} xs={6} md={4} xl={3} className="column-categs">
                    <Category category={el} />
                  </Col>
                  )
                })}
              
                
                </>
              ))}
            </Row>
          </EmptyView>
        </Loader>
      </Container>
    </div>
  )
}

export default CategoriesScreen
