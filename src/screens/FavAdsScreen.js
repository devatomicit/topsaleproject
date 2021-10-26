import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAds } from '../services/favAdsService'
import Loader from '../components/Loader'
import { isAuthenticated } from '../utils/helper'
import AdsList from '../components/AdsList'
import EmptyView from '../components/EmptyView'
import { t } from '../utils/helper'

const FavAdsScreen = ({ history }) => {
  const [ads, setAds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const ads = await getAds()
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

  return (
    <div className="container m-auto m-20">
    <Loader isLoading={isLoading}>
      <h3 className="border-bottom pb-3 mb-3">{t('favorite')}</h3>
      <EmptyView isEmpty={error} message={error || t('no_data')}>
        <AdsList ads={ads} />
      </EmptyView>
    </Loader>
    </div>
  )
}

export default FavAdsScreen
