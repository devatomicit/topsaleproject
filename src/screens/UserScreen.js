import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getUserAds } from '../services/adsService'
import { getUser } from '../services/userService'
import Loader from '../components/Loader'
import AdsList from '../components/AdsList'
import EmptyView from '../components/EmptyView'
import { Col, Row } from 'react-bootstrap'
import UserCardSide from '../components/UserCardSide'
import { t } from '../utils/helper'

const UserScreen = ({ match, history }) => {
  const [user, setUser] = useState({})
  const [ads, setAds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const userId = match.params.id

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchData() {
    setIsLoading(true)
    await fetchUser()
    await fetchAds()
    setIsLoading(false)
  }

  async function fetchUser() {
    try {
      const user = await getUser(userId)
      setUser(user)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setError(errorString)
      history.replace('/not-found')
    }
  }

  async function fetchAds(page = 1) {
    try {
      const ads = await getUserAds(userId, page)
      setAds(ads)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
    }
  }

  return (
    <Loader isLoading={isLoading}>
      <h3 className="border-bottom pb-3 mb-3">{t('user_ads')}</h3>
      <EmptyView isEmpty={error} message={error || t('no_data')}>
        <Row>
          <Col lg={4}>{user && <UserCardSide user={user} />}</Col>
          <Col lg={8}>
            <AdsList ads={ads} />
          </Col>
        </Row>
      </EmptyView>
    </Loader>
  )
}

export default UserScreen
