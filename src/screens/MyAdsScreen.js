import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getMyAds } from '../services/myAdsService'
import Loader from '../components/Loader'
import { isAuthenticated } from '../utils/helper'
import MyAd from '../components/MyAd'
import DeleteAdModal from '../components/DeleteAdModal'
import { t } from '../utils/helper'
import EmptyView from '../components/EmptyView'

const MyAdsScreen = ({ history }) => {
  const [ads, setAds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [toDeleteAd, setToDeleteAd] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const ads = await getMyAds()
        setAds(ads)
        setIsLoading(false)
      } catch (ex) {
        const errorString = ex.message || ex.toString()
        toast.error(errorString)
        setError(errorString)
        setIsLoading(false)
      }
    }

    if (!isAuthenticated()) return history.replace('/login')
    setAds([])
    setIsLoading(true)
    fetchData()
  }, [history])

  const onDelete = ad => {
    setToDeleteAd(ad)
    setShowDeleteModal(true)
  }

  const onDeleteSucceed = deletedAd => {
    const updatedAds = ads.filter(ad => ad._id !== deletedAd._id)
    setAds(updatedAds)
    setToDeleteAd({})
  }

  const onEdit = ad => {
    history.push(`/my-ads/${ad._id}/edit`)
  }

  const onRepublishSucceed = updatedAd => {
    let newAds = ads.filter(ad => ad._id !== updatedAd._id)
    newAds = [updatedAd, ...newAds]
    setAds(newAds)
  }

  const onToggleActivationSucceed = updatedAd => {
    const newAds = [...ads]
    const index = newAds.findIndex(el => el._id === updatedAd._id)
    newAds[index] = updatedAd
    setAds(newAds)
  }

  return (
    <div className="container m-auto m-20">
    <Loader isLoading={isLoading}>
      <h3 className="border-bottom pb-3 mb-3">{t('my_ads')}</h3>
      <EmptyView
        isEmpty={!isLoading && ads.length === 0}
        message={error || t('no_data')}
      >
        <Row>
          {ads.map(ad => (
            <Col key={ad._id} xs={12} md={6} lg={4}>
              <MyAd
                onDelete={onDelete}
                onEdit={onEdit}
                onRepublishSucceed={onRepublishSucceed}
                onToggleActivationSucceed={onToggleActivationSucceed}
                ad={ad}
              />
            </Col>
          ))}
        </Row>
      </EmptyView>

      <DeleteAdModal
        ad={toDeleteAd}
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onDeleteSucceed={onDeleteSucceed}
      />
    </Loader>
    </div>
  )
}

export default MyAdsScreen
