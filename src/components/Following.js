import React, { useState } from 'react'
import { unfollowUser } from '../services/followService'
import Follower from './Follower'
import { toast } from 'react-toastify'
import LoadingButton from './common/LoadingButton'
import { t } from '../utils/helper'

const Following = ({ user, onUnfollowSucceed }) => {
  const [isProcessingUnfollow, setIsProcessingUnfollow] = useState(false)

  const onUnfollow = async () => {
    try {
      setIsProcessingUnfollow(true)
      await unfollowUser(user._id)
      onUnfollowSucceed()
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setIsProcessingUnfollow(false)
    }
  }

  return (
    <Follower user={user}>
      <LoadingButton
        isProcessing={isProcessingUnfollow}
        label={t('unfollow')}
        onClick={onUnfollow}
      />
    </Follower>
  )
}

export default Following
