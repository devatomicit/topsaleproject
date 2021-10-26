import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getFollowers } from '../services/followService'
import Loader from '../components/Loader'
import { isAuthenticated } from '../utils/helper'
import Follower from '../components/Follower'
import EmptyView from '../components/EmptyView'
import { t } from '../utils/helper'

const FollowersScreen = ({ history }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getFollowers()
        setUsers(users)
        setIsLoading(false)
      } catch (ex) {
        const errorString = ex.message || ex.toString()
        toast.error(errorString)
        setError(errorString)
        setIsLoading(false)
      }
    }

    if (!isAuthenticated()) return history.replace('/login')
    setUsers([])
    setIsLoading(true)
    fetchData()
  }, [history])

  return (
    <div className="container m-auto m-20">
    <Loader isLoading={isLoading}>
      <h3 className="border-bottom pb-3 mb-3">{t('followers')}</h3>
      <EmptyView
        isEmpty={!isLoading && users.length === 0}
        message={error || t('no_data')}
      >
        <Row>
          {users.map(user => (
            <Col key={user._id} xs={12} sm={6} xl={4}>
              <Follower user={user} />
            </Col>
          ))}
        </Row>
      </EmptyView>
    </Loader>
    </div>
  )
}

export default FollowersScreen
