import React, { useState } from 'react'
import LoadingButton from './common/LoadingButton'
import { toast } from 'react-toastify'
import { unblockUser } from '../services/blockService'
import Follower from './Follower'
import { t } from '../utils/helper'

const Blocked = ({ user, onUnblockSucceed }) => {
  const [isProcessingUnblock, setIsProcessingUnblock] = useState(false)

  const onUnblock = async () => {
    try {
      setIsProcessingUnblock(true)
      const { message } = await unblockUser(user._id)
      toast.success(message)
      onUnblockSucceed()
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      setIsProcessingUnblock(false)
    }
  }

  return (
    <Follower user={user}>
      <LoadingButton
        isProcessing={isProcessingUnblock}
        label={t('unblock')}
        onClick={onUnblock}
      />
    </Follower>
  )
}

export default Blocked
