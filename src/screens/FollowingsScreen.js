import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getFollowings } from '../services/followService'
import Loader from '../components/Loader'
import { isAuthenticated } from '../utils/helper'
import EmptyView from '../components/EmptyView'
import Following from '../components/Following'
import { t } from '../utils/helper'

const FollowingsScreen = ({ history }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getFollowings()
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

  const onUnfollowSucceed = user => {
    const currentUsers = [...users]
    const updatedUsers = currentUsers.filter(u => u._id !== user._id)
    setUsers(updatedUsers)
  }

  return (
    <div className="container m-auto m-20">
    <Loader isLoading={isLoading}>
      <h3 className="border-bottom pb-3 mb-3">{t('followings')}</h3>
      <EmptyView
        isEmpty={!isLoading && users.length === 0}
        message={error || t('no_data')}
      >
        <Row>
          {users.map(user => (
            <Col key={user._id} xs={12} sm={6} xl={4}>
              <Following
                onUnfollowSucceed={() => onUnfollowSucceed(user)}
                user={user}
              />
            </Col>
          ))}
        </Row>
      </EmptyView>
    </Loader>
    </div>
  
  )
}

export default FollowingsScreen
