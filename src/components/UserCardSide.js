import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Image } from 'react-bootstrap'
import LoadingButton from './common/LoadingButton'
import { isAuthenticated } from '../utils/helper'
import { followUser, unfollowUser } from '../services/followService'
import { blockUser } from '../services/blockService'
import { toast } from 'react-toastify'
import { t } from '../utils/helper'
import { avatar } from '../utils/images'

const UserCardSide = ({ user, onToggleFollowSucceed, history }) => {
  const [isProcessingFollow, setIsProcessingFollow] = useState(false)
  const [isProcessingBlock, setIsProcessingBlock] = useState(false)

  const onToggleFollow = async () => {
    if (!isAuthenticated()) return history.replace('/login')

    try {
      const { isFollowing } = user
      setIsProcessingFollow(true)
      let message
      if (isFollowing) {
        const res = await unfollowUser(user._id)
        message = res.message
      } else {
        const res = await followUser(user._id)
        message = res.message
      }
      toast.success(message)
      onToggleFollowSucceed(!isFollowing)
      setIsProcessingFollow(false)
    } catch (ex) {
      toast.error(ex.message || ex.toString())
      setIsProcessingFollow(false)
    }
  }

  const onBlock = async () => {
    if (!isAuthenticated()) return history.replace('/login')

    try {
      setIsProcessingBlock(true)
      const { message } = await blockUser(user._id)
      toast.success(message)
      setIsProcessingBlock(false)
      history.goBack()
    } catch (ex) {
      toast.error(ex.message || ex.toString())
      setIsProcessingBlock(false)
    }
  }

  const onChat = async () => {
    if (!isAuthenticated()) return history.replace('/login')
  }

  return (
    <Card className="bg-light p-3 mb-3">
      <Link to={`/users/${user._id}`}>
        <div className="text-center">
          <div className="mb-2">
            <strong>{user.name}</strong>
          </div>

          <Image
            className="shadow-sm w-10 h-10 mb-3"
            roundedCircle
            src={user.profilePhoto || avatar}
            width={120}
            height={120}
            alt="user profile photo"
          />
        </div>
      </Link>

      <Button href={`tel:${user.mobile}`} className="mb-2" variant="success">
      <i className="far fa-phone-volume"></i> {" "}   {t('call')} ({user.mobile})
      </Button>

      <Button
        href={`https://wa.me/${user.mobile}`}
        className="mb-2"
        variant="success"
      >
       <i className="fab fa-whatsapp"></i> {" "} {t('whatsapp')} ({user.mobile})
      </Button>

      <Button href={`sms:${user.mobile}`} className="mb-2" variant="success">
      <i className="far fa-sms"></i> {" "}  {t('sms')} ({user.mobile})
      </Button>

      {user.email && (
        <Button
          href={`mailto:${user.email}`}
          className="mb-2"
          variant="primary"
        >
          {user.email}
        </Button>
      )}

      {/* <Button onClick={onChat} className="mb-2" variant="info">
        {t('chat')}
      </Button> */}

      {/* Follow Button */}
      <LoadingButton
        variant={user.isFollowing ? 'primary' : 'outline-primary'}
        isProcessing={isProcessingFollow}
        onClick={onToggleFollow}
        className="mb-2"
      >
        {user.isFollowing ? t('unfollow') : t('follow')}
      </LoadingButton>

      {/* Block Button */}
      <LoadingButton
        variant="danger"
        isProcessing={isProcessingBlock}
        onClick={onBlock}
      >
        {t('block')}
      </LoadingButton>
    </Card>
  )
}

export default UserCardSide
