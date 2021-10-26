import React, { useState, useEffect, useContext } from 'react'
import { Container, Card, Row, Col, Button, Image } from 'react-bootstrap'
import useDropdown from '../hooks/useDropdown'
import { getCategories } from '../services/categoriesService'
import { getRegions } from '../services/regionsService'
import { getCarMakes, getCarModels } from '../services/carsService'
import Input from '../components/common/Input'
import { getYears, t } from '../utils/helper'
import AuthContext from '../contexts/AuthContext'
import ImageUploading from 'react-images-uploading'
import { toast } from 'react-toastify'
import LoadingButton from '../components/common/LoadingButton'
import NewAdConfirmModal from '../components/NewAdConfirmModal'
import { postAd } from '../services/myAdsService'

const years = getYears()
const maxImages = 15

const NewAdScreen = ({ history }) => {
  const { lang, isAuthenticated } = useContext(AuthContext)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [withoutPhotos, setWithoutPhotos] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState([])
  const [images, setImages] = useState([])
const [numberOfBathroom,setnumbath]=useState('')
const [numberOfRooms,setnumbad]=useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [details, setDetails] = useState('')
  const [km, setKm] = useState('')

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const [categoryId, CategoriesDropdown, setCategoryId] = useDropdown(
    t('category'),
    '',
    categories.map(cat => {
      return { value: cat._id, title: cat.title[lang] }
    }),
    t('select_category'),
    { showLabel: false, error: errors['categoryId'] }
  )

  const [subcategories, setSubcategories] = useState([])
  const [subcategoryId, SubcategoriesDropdown, setSubcategoryId] = useDropdown(
    t('subcategory'),
    '',
    subcategories.map(subcat => {
      return { value: subcat._id, title: subcat.title[lang] }
    }),
    t('select_subcategory'),
    { showLabel: false, error: errors['subcategoryId'] }
  )

  const [types, setTypes] = useState([])
  const [typeId, TypesDropdown, setTypeId] = useDropdown(
    t('type'),
    '',
    types.map(type => {
      return { value: type._id, title: type.title[lang] }
    }),
    t('select_type'),
    { showLabel: false, error: errors['typeId'] }
  )

  const [regions, setRegions] = useState([])
  const [regionId, RegionsDropdown, setRegionId] = useDropdown(
    t('region'),
    '',
    regions.map(region => {
      return { value: region._id, title: region.title[lang] }
    }),
    t('select_region'),
    { showLabel: false}
  )

  const [makes, setMakes] = useState([])
  const [makeId, MakesDropdown, setMakeId] = useDropdown(
    t('make'),
    '',
    makes.map(make => {
      return { value: make._id, title: make.title }
    }),
    t('select_make'),
    { showLabel: false, error: errors['makeId'] }
  )

  const [models, setModels] = useState([])
  const [modelId, ModelsDropdown, setModelId] = useDropdown(
    t('model'),
    '',
    models.map(model => {
      return { value: model._id, title: model.title }
    }),
    t('select_model'),
    { showLabel: false, error: errors['modelId'] }
  )

  const [year, YearsDropdown, setYear] = useDropdown(
    t('year'),
    '',
    years.map(year => {
      return { value: year, title: year }
    }),
    t('select_year'),
    { showLabel: false, error: errors['year'] }
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

    if (!isAuthenticated) return history.replace('/login')

    fetchCategories()
    fetchRegions()
    fetchCarMakes()

    return () => {
      setCategories([])
      setRegions([])
      setMakes([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const category = categories.find(cat => cat._id === categoryId)
    if (category) {
      setCategory(category)
      setSubcategories(category.subcategories)
      setTypes(category.types)
    } else {
      setCategory({})
      setSubcategories([])
      setTypes([])
    }

    // clear other inputs
    setSubcategoryId('')
    setTypeId('')
    setRegionId('')
    setMakeId('')
    //setModelId('')
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
    if (makeId) fetchCarModels()

    return () => {
      setModels([])
    }
  }, [makeId])

  const onSelectImages = (images, index) => {
    setImages(images)
  }

  const onSubmit = async () => {
    const isValidRequest = validateAllInputs()
    if (!isValidRequest) return

    const data = {
      title,
      price,
      details,
      categoryId,
      subcategoryId,
      typeId,
      regionId,
      makeId,
      modelId,
      year,
      km,
      images,
      numberOfBathroom,
      numberOfRooms

    }
    try {
      setIsSubmitting(true)
      const { ad, message } = await postAd(data)
      toast.success(message)
      history.replace('/my-ads')
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setIsSubmitting(false)
    }
  }

  const validateAllInputs = () => {
    const errors = {}
    if (!title) errors.title = t('required')
    if (!price) errors.price = t('required')
  
    if (!category || (category && isEmptyObj(category))) {
      errors.categoryId = t('required')
    } else {
      if (category.subcategories.length > 0 && !subcategoryId)
        errors.subcategoryId = t('required')
      if (category.types.length > 0 && !typeId) errors.typeId = t('required')
      if (category.type === 'cars') {
        if (!makeId) errors.makeId = t('required')
        if (!modelId) errors.modelId = t('required')
        if (!year) errors.year = t('required')
        if (!km) errors.km = t('required')
      }
      if (category.type === 'properties') {
        if (!regionId) errors.regionId = t('required')
      }
    }

    setErrors(errors)
    if (!isEmptyObj(errors)) return false
    // if (images.length === 0 && !withoutPhotos) {
    //   setShowConfirmModal(true)
    //   return false
    // }
    return true
  }

  const onProceed = async () => {
    setShowConfirmModal(false)
    setWithoutPhotos(true)
    await onSubmit()
  }

  const isEmptyObj = obj => {
    return Object.keys(obj).length === 0
  }

  return (
    <Container>
      <h3 className="border-bottom pb-3 mb-3">{t('new_ad')}</h3>
      <p className="text-center">{t('new_ad_subtitle')}</p>
      
      <Row>
        <Col lg={6}>
          <Card className="py-3 px-3 mb-3 bg-light">
            <div className="text-center">{t('photo_clear_note')}</div>
            <ImageUploading
              multiple
              value={images}
              onChange={onSelectImages}
              maxNumber={maxImages}
              maxFileSize={5242880}
              acceptType={['jpg', 'jpeg', 'png']}
              onError={(errors, files) => {
                let message = ''
                if (errors.maxNumber) message = t('images_max_number')
                else if (errors.acceptType) message = t('images_wrong_type')
                else if (errors.maxFileSize) message = t('images_max_file_size')
                else if (errors.resolution)
                  message = t('images_wrong_resolution')
                else message = 'other error'
                toast.error(message)
              }}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  {/* Click & Drop Area */}
                  <div
                    style={
                      isDragging
                        ? { color: 'red', minHeight: '120px' }
                        : { minHeight: '120px' }
                    }
                    className="clickable dotedborder shadow-sm p-3 my-2 d-flex flex-column justify-content-center align-items-center"
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <i class="far fa-cloud-upload-alt colorprimary font40"></i>
                    <strong>
                      {isDragging ? t('drop_here') : t('click_drop')}
                    </strong>
                  </div>

                  

                  {/* Remove All Button */}
                  {imageList.length > 0 && (
                    <Button
                      variant="secondary text-light"
                      onClick={onImageRemoveAll}
                    >
                      {t('remove_all_images')}
                    </Button>
                  )}

                  {/* Picked Images */}
                  <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
                    {imageList.map((image, index) => (
                      <div
                        key={`new_img_${index}`}
                        className="image-item new-img-container"
                      >
                        <Image
                          className="new-img"
                          style={{ objectFit: 'cover' }}
                          src={image['data_url']}
                          alt=""
                          width="110"
                          height="110"
                        />
                        <div className="middle">
                          <Button onClick={() => onImageRemove(index)}>
                            <strong>X</strong>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </Card>
        </Col>

        <Col lg={6}>
          
        <Card className="pt-3 px-3 mb-3 bg-light">
           {/* Title */}
           <Input
              onChange={e => setTitle(e.target.value)}
              value={title}
              type="text"
              name="title"
              label={t('ad_title')}
              error={errors['title']}
            />
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
                <>
                <Col xs={12}>
                  <RegionsDropdown />
                  </Col>
                  <Col xs={12}>
                  <Input
              onChange={e => setnumbath(e.target.value)}
              value={numberOfBathroom}
              type="text"
              name="numbath"
              label={t('newads.numbath')}
              error={errors['numbath']}
            />
                  </Col>
                  <Col xs={12}>
                  <Input
              onChange={e => setnumbad(e.target.value)}
              value={numberOfRooms}
              type="text"
              name="numbad"
              label={t('newads.numbad')}
              error={errors['numbad']}
            />
             
                  </Col>
                </>
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
                    <Input
                      type="number"
                      value={km}
                      onChange={e => setKm(e.target.value)}
                      placeholder="5000"
                      label={t('km')}
                      error={errors['km']}
                    />
                  </Col>
                </>
              )}
            </Row>
  

           

            {/* Price */}
            <Input
              onChange={e => setPrice(e.target.value)}
              value={price}
              type="number"
              name="price"
              label={t('price')}
              error={errors['price']}
            />

            {/* Details */}
            <Input
              as="textarea"
              rows={5}
              onChange={e => setDetails(e.target.value)}
              value={details}
              type="text"
              name="details"
              label={t('ad_details')}
             
            />
            <div className="my-3 d-flex flex-row-reverse">
        <LoadingButton isProcessing={isSubmitting} onClick={onSubmit}>
          {t('publish_ad')}
        </LoadingButton>
      </div>
          </Card>
        </Col>
      </Row>

      <NewAdConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        onProceed={onProceed}
      />
    </Container>
  )
}

export default NewAdScreen
