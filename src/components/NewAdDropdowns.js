import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import useDropdown from '../hooks/useDropdown'
import { getCategories } from '../services/categoriesService'
import { getRegions } from '../services/regionsService'
import { getCarMakes, getCarModels } from '../services/carsService'
import Input from './common/Input'

const years = [2021, 2020, 2019, 2018]

const NewAdDropdowns = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const [categoryId, CategoriesDropdown, setCategoryId] = useDropdown(
    'Category',
    '',
    categories.map(cat => {
      return { value: cat._id, title: cat.title['en'] }
    }),
    'Select Category',
    { showLabel: false }
  )

  const [subcategories, setSubcategories] = useState([])
  const [subcategoryId, SubcategoriesDropdown, setSubcategoryId] = useDropdown(
    'subcategory',
    '',
    subcategories.map(subcat => {
      return { value: subcat._id, title: subcat.title['en'] }
    }),
    'Select Subcategory',
    { showLabel: false }
  )

  const [types, setTypes] = useState([])
  const [typeId, TypesDropdown, setTypeId] = useDropdown(
    'type',
    '',
    types.map(type => {
      return { value: type._id, title: type.title['en'] }
    }),
    'Select Type',
    { showLabel: false }
  )

  const [regions, setRegions] = useState([])
  const [regionId, RegionsDropdown, setRegionId] = useDropdown(
    'region',
    '',
    regions.map(region => {
      return { value: region._id, title: region.title['en'] }
    }),
    'Select Region',
    { showLabel: false }
  )

  const [makes, setMakes] = useState([])
  const [makeId, MakesDropdown, setMakeId] = useDropdown(
    'carmake',
    '',
    makes.map(make => {
      return { value: make._id, title: make.title }
    }),
    'Select Make',
    { showLabel: false }
  )

  const [models, setModels] = useState([])
  const [modelId, ModelsDropdown, setModelId] = useDropdown(
    'carmodel',
    '',
    models.map(model => {
      return { value: model._id, title: model.title }
    }),
    'Select Model',
    { showLabel: false }
  )

  const [year, YearsDropdown, setYear] = useDropdown(
    'caryear',
    '',
    years.map(year => {
      return { value: year, title: year }
    }),
    'Select Year',
    { showLabel: false }
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

      // clear other inputs
      setSubcategoryId('')
      setTypeId('')
      setRegionId('')
      setMakeId('')
      //setModelId('')
      setYear('')
    }
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
    if (makeId) fetchCarModels()

    return () => {
      setModels([])
    }
  }, [makeId])

  return (
    <Card className="pt-3 px-3 bg-light">
      <Row>
        <Col xs={12}>
          <CategoriesDropdown />
        </Col>

        {subcategories && subcategories.length > 0 && (
          <Col xs={12}>
            <SubcategoriesDropdown />
          </Col>
        )}

        {types && types.length > 0 && (
          <Col xs={12}>
            <TypesDropdown />
          </Col>
        )}

        {category && category.type === 'properties' && (
          <Col xs={12}>
            <RegionsDropdown />
          </Col>
        )}

        {category && category.type === 'cars' && (
          <>
            <Col xs={12}>
              <MakesDropdown />
            </Col>

            <Col xs={12}>
              <ModelsDropdown />
            </Col>

            <Col xs={12}>
              <YearsDropdown />
            </Col>

            <Col xs={12}>
              <Input type="number" placeholder="5000" label="Kilometers" />
            </Col>
          </>
        )}
      </Row>
    </Card>
  )
}

export default NewAdDropdowns
