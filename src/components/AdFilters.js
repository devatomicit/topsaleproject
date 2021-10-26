import React, { useState, useEffect, useContext } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import useDropdown from '../hooks/useDropdown'
import { getCategories } from '../services/categoriesService'
import { getRegions } from '../services/regionsService'
import { getCarMakes, getCarModels } from '../services/carsService'
import { t, getYears } from '../utils/helper'
import AuthContext from '../contexts/AuthContext'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const years = getYears()

const AdFilters = ({ category: defaultCategory, onApply,
  filteradsbyprice,max,min ,minroom,maxroom,filteradsbyroom }) => {
  const { lang } = useContext(AuthContext)
const [valuef, setvaluef] = useState({min:min,max:max,minroom:minroom,maxroom:maxroom})
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const [categoryId, CategoriesDropdown, setCategoryId] = useDropdown(
    t('category'),
    defaultCategory._id || '',
    categories.map(cat => {
      return { value: cat._id, title: cat.title[lang] }
    }),
    null
  )

  const [subcategories, setSubcategories] = useState([])
  const [subcategoryId, SubcategoriesDropdown, setSubcategoryId] = useDropdown(
    t('subcategory'),
    '',
    subcategories.map(subcat => {
      return { value: subcat._id, title: subcat.title[lang] }
    }),
    t('all_subcategories')
  )

  const [types, setTypes] = useState([])
  const [typeId, TypesDropdown, setTypeId] = useDropdown(
    t('type'),
    '',
    types.map(type => {
      return { value: type._id, title: type.title[lang] }
    }),
    t('all_types')
  )

  const [regions, setRegions] = useState([])
  const [regionId, RegionsDropdown, setRegionId] = useDropdown(
    t('region'),
    '',
    regions.map(region => {
      return { value: region._id, title: region.title[lang] }
    }),
    t('all_regions')
  )

  const [makes, setMakes] = useState([])
  const [makeId, MakesDropdown, setMakeId] = useDropdown(
    t('make'),
    '',
    makes.map(make => {
      return { value: make._id, title: make.title }
    }),
    t('all_makes')
  )

  const [models, setModels] = useState([])
  const [modelId, ModelsDropdown, setModelId] = useDropdown(
    t('model'),
    '',
    models.map(model => {
      return { value: model._id, title: model.title }
    }),
    t('all_models')
  )

  const [year, YearsDropdown, setYear] = useDropdown(
    t('year'),
    '',
    years.map(year => {
      return { value: year, title: year }
    }),
    t('all_years')
  )

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories()
        setCategories(categories)
      } catch (ex) {}
    }

    async function fetchRegions() {
      try {
        const regions = await getRegions()
        setRegions(regions)
      } catch (ex) {}
    }

    async function fetchCarMakes() {
      try {
        const makes = await getCarMakes()
        setMakes(makes)
      } catch (ex) {}
    }

    fetchCategories()
    fetchRegions()
    fetchCarMakes()

    return () => {
      setCategories([])
      setRegions([])
      setMakes([])
    }
  }, [])

  useEffect(() => {
    const category = categories.find(cat => cat._id === categoryId)
    if (category) {
      setCategory(category)
  
      setSubcategories(category.subcategories)
      setTypes(category.types)
     
      
    }

    // clear other inputs
    setSubcategoryId('')
    setTypeId('')
    setRegionId('')
    setMakeId('')
    setModelId('')
    setYear('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, categories])

  useEffect(() => {
    async function fetchCarModels() {
      try {
        const models = await getCarModels(makeId)
        setModels(models)
      } catch (ex) {}
    }

    setModels([])
    setModelId('')
    if (makeId) fetchCarModels()

    return () => {
      setModels([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [makeId])
 
  const onReset = () => {
    if (defaultCategory._id && categoryId !== defaultCategory._id)
      setCategoryId(defaultCategory._id)

    setSubcategoryId('')
    setTypeId('')
    setRegionId('')
    setMakeId('')
    setModelId('')
    setYear('')
  }
 
const handelchange = (val) => {
  setvaluef({...valuef, min:val[0],max:val[1]})
  filteradsbyprice(val)
}
 
const handelchangebath = (val) => {
  setvaluef({...valuef, minroom:val[0],maxroom:val[1]})
  filteradsbyroom(val)
}
  if (!defaultCategory._id) return <></>
  return (
    <Card className="p-3 bg-light">
      <Row>
        <Col xs={12} md={6} lg={4} xl={3}>
          <CategoriesDropdown />
        </Col>

        {subcategories && subcategories.length > 0 && (
          <Col xs={12} md={6} lg={4} xl={3}>
            <SubcategoriesDropdown />
          </Col>
        )}

        {types && types.length > 0 && (
          <Col xs={12} md={6} lg={4} xl={3}>
            <TypesDropdown />
          </Col>
        )}

        {category && category.type === 'properties' && (
          <>
          <Col xs={12} md={6} lg={4} xl={3}>
            <RegionsDropdown />
          </Col>
          <Col xs={12} md={6} lg={4} xl={3}>
            <label>{t("filterads.byprice")}</label>
          <div className="d-flex justify-content-between">
            <span>{valuef.min}</span>
            <span>{valuef.max}</span>
            </div>
          <Range
          defaultValue={[max,min]}
          max={max}
          min={min}
          onChange={handelchange}
        />
      

           
           
           </Col> 
           <Col xs={12} md={6} lg={4} xl={3}>
            <label>{t("filterads.byroom")}</label>
          <div className="d-flex justify-content-between">
            <span>{valuef.minroom}</span>
            <span>{valuef.maxroom}</span>
            </div>
          <Range
          defaultValue={[maxroom, minroom]}
          max={maxroom}
          min={minroom}
      
          onChange={handelchangebath}
        />

           </Col> 
           </>
        )}

        {category && category.type === 'cars' && (
          <>
            <Col xs={12} md={6} lg={4} xl={3}>
              <MakesDropdown />
            </Col>

            <Col xs={12} md={6} lg={4} xl={3}>
              <ModelsDropdown />
            </Col>

            <Col xs={12} md={6} lg={4} xl={3}>
              <YearsDropdown />
            </Col>
          </>
        )}
      </Row>

      <Row>
        <Col sm={6}>
          <Button
            onClick={() =>
              onApply({
                category,
                subcategoryId,
                typeId,
                regionId,
                makeId,
                modelId,
                year,
              })
            }
            style={{ width: 100 }}
          >
            {t('apply')}
          </Button>
          <Button
            style={{ width: 100 }}
            className="mx-2"
            variant="outline-dark"
            onClick={onReset}
          >
            {t('reset')}
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default AdFilters
