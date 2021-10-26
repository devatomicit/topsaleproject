import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { getAds } from '../services/adsService'
import { getCategory } from '../services/categoriesService'
import Loader from '../components/Loader'
import EmptyView from '../components/EmptyView'
import AdsList from '../components/AdsList'
import { Breadcrumb } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AdFilters from '../components/AdFilters'
import { t } from '../utils/helper'
import AuthContext from '../contexts/AuthContext'

const AdsScreen = ({ match }) => {
  const categoryId = match.params.id

  const { lang } = useContext(AuthContext)
  const [min, setmin] = useState("")
  const [max, setmax] = useState("")
  const [maxroom,setmaxroom] = useState("")
  const [minroom ,setminroom] = useState("")
  const [category, setCategory] = useState({})
  const [ads, setAds] = useState([])
  const [allads, setAdsall] = useState([])
  const [filtredstate,setfiltredstate] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [categoryId])
  async function fetchData() {
    try {
      const category = await getCategory(categoryId)
      const ads = await getAds(1, { categoryId })
      setCategory(category)
      setAds(ads)
      setAdsall(ads)
      const price= ads.map(el =>el.price)
      const   numberOfRooms= ads.filter(el =>el.numberOfRooms).map(el => el.numberOfRooms)

      const maxbath = Math.max(...numberOfRooms)
      setmaxroom(maxbath)
      const minbath = Math.min(...numberOfRooms)
      setminroom(minbath)
      const max = Math.max(...price)
      setmax(max)
      const min = Math.min(...price)
      setmin(min)
      setIsLoading(false)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setError(errorString)
      setIsLoading(false)
    }
  }
  // TODO:- manipulate browser link to add query parameters and fix categoryId if necessary
  // AND keep state for filters here for pagination
  const onApply = async ({
    category,
    subcategoryId,
    typeId,
    regionId,
    makeId,
    modelId,
    year,
  }) => {
 
    try {
      setIsLoading(true)
      const ads = await getAds(1, {
        categoryId: category._id,
        subcategoryId,
        typeId,
        regionId,
        makeId,
        modelId,
        year,
      })
      setCategory(category)
      setAds(ads)
      setIsLoading(false)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setError(errorString)
      setIsLoading(false)
    }
  }
const filteradsbyprice = (range) => 
{
const newads = allads.filter(el => el.price >=range[0] && el.price <=range[1])
const fil= [...newads];
setAds(prevstate => ([...fil]));

}
const filteradsbyroom= (range) => 
{
const newads = allads.filter(el => el.numberOfRooms >=range[0] && el.numberOfRooms <=range[1])
const fil= [...newads];
setAds(prevstate => ([...fil]));

}
  return (
    <div className="container">
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>{t('home')}</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/categories">
          <Breadcrumb.Item>{t('categories')}</Breadcrumb.Item>
        </LinkContainer>
        {category._id && (
          <Breadcrumb.Item active>{category.title[lang]}</Breadcrumb.Item>
        )}
      </Breadcrumb>

      {category._id && <AdFilters category={category} onApply={onApply} filteradsbyprice={filteradsbyprice}
      max={max} min={min}  minroom={minroom} maxroom={maxroom} filteradsbyroom={filteradsbyroom}/>}

      <Loader isLoading={isLoading}>
        <EmptyView
          isEmpty={error || ads.length === 0}
          message={error || t('no_results')}
        >
          <AdsList ads={ads} cat={category} filtredstate={filtredstate} />
        </EmptyView>
      </Loader>
    </div>
  )
}

export default AdsScreen
