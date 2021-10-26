import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Form, Image, Button } from 'react-bootstrap'
import Input from '../components/common/Input'
import LoadingButton from '../components/common/LoadingButton'
import { getProfile, updateProfile } from '../services/profileService'
import { isAuthenticated } from '../utils/helper'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import EmptyView from '../components/EmptyView'
import AuthContext from '../contexts/AuthContext'
import { t } from '../utils/helper'
import { avatar } from '../utils/images'
import ImageUploading from 'react-images-uploading'

const ProfileScreen = ({ history }) => {
  const [user, setUser] = useState({})
  const [profilePhoto, setProfilePhoto] = useState(avatar)
  const [newProfilePhoto, setNewProfilePhoto] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { onUpdateUser } = useContext(AuthContext)

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getProfile()
        setUser(user)
        userDidUpdate(user)
        setIsLoading(false)
      } catch (ex) {
        const errorString = ex.message || ex.toString()
        toast.error(errorString)
        setError(errorString)
        setIsLoading(false)
      }
    }

    if (!isAuthenticated()) return history.replace('/login')
    setIsLoading(true)
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const userDidUpdate = user => {
    const { name, email, bio, profilePhoto, stats } = user
    onUpdateUser({ name, email, bio, profilePhoto, stats })
    setProfilePhoto(profilePhoto || avatar)
    setName(name)
    setEmail(email || '')
    setBio(bio || '')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsProcessing(true)
    const data = { name, bio, email, image: newProfilePhoto }
    try {
      const { user, message } = await updateProfile(data)
      toast.success(message)
      setNewProfilePhoto(null)
      setUser(user)
      userDidUpdate(user)
      setIsProcessing(false)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setIsProcessing(false)
    }
  }

  const onSelectPhoto = (images, index) => {
    const image = images[0]
    setNewProfilePhoto(image)
  }

  return (
    <>
   
    <Loader isLoading={isLoading}>
      <EmptyView isEmpty={!isLoading && error} message={error}>
        <Container>
          <Row>
            <Col className="bg-light card shadow-sm p-3 my-2">
              {/* Title */}
              <h1 className="h3 text-center mb-4 text-secondary">
                {t('profile')}
              </h1>

              {/* Profile Photo */}
              <div className="text-center pb-4">
                <ImageUploading
                  value={newProfilePhoto ? [newProfilePhoto] : []}
                  onChange={onSelectPhoto}
                  maxFileSize={5242880}
                  acceptType={['jpg', 'jpeg', 'png']}
                  onError={(errors, files) => {
                    let message = ''
                    if (errors.maxNumber) message = t('images_max_number')
                    else if (errors.acceptType) message = t('images_wrong_type')
                    else if (errors.maxFileSize)
                      message = t('images_max_file_size')
                    else if (errors.resolution)
                      message = t('images_wrong_resolution')
                    else message = 'other error'
                    toast.error(message)
                  }}
                  dataURLKey="data_url"
                >
                  {({ imageList, onImageUpload }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      {/* Image */}
                      <div className="mb-3">
                        {imageList.length > 0 ? (
                          imageList.map((image, index) => (
                            <div
                              key={`new_img_${index}`}
                              className="image-item"
                            >
                              <Image
                                style={{ objectFit: 'cover' }}
                                src={image['data_url']}
                                alt="profile photo"
                                width={120}
                                height={120}
                                roundedCircle
                              />
                            </div>
                          ))
                        ) : (
                          <Image
                            style={{ objectFit: 'cover' }}
                            roundedCircle
                            src={profilePhoto}
                            width={120}
                            height={120}
                            alt="profile photo"
                          />
                        )}
                      </div>

                      {/* Change Photo Button */}
                      <Button onClick={onImageUpload}>
                        {t('change_profile_photo')}
                      </Button>
                    </div>
                  )}
                </ImageUploading>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                <Col md={6}>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  label={t('user_name')}
                  onChange={e => setName(e.target.value)}
                  error={null}
                />
                </Col>
                <Col md={6}>
                <Input
                  disabled={true}
                  type="text"
                  name="mobile"
                  value={user.mobile}
                  label={t('mobile')}
                />
                </Col>
                 <Col md={6}>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  label={t('email_optional')}
                  onChange={e => setEmail(e.target.value)}
                  error={null}
                />
               </Col>
                 <Col md={6}>
                <Input
                  as="textarea"
                  rows={3}
                  type="text"
                  name="bio"
                  value={bio}
                  label={t('bio_optional')}
                  onChange={e => setBio(e.target.value)}
                  error={null}
                />
                 </Col>
                </Row>
                <Col md={4}>
                <LoadingButton
                  label={t('update')}
                  isProcessing={isProcessing}
                  type="submit"
                />
                </Col>
              </Form>
            </Col>
          </Row>
        </Container>
      </EmptyView>
    </Loader>
    </>
  )
}

export default ProfileScreen
