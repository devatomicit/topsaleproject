import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { getAd, getRelatedAds, toggleLike } from '../services/adsService'
import Loader from '../components/Loader'
import { Container, Row, Col, Breadcrumb, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { toggleFavorite } from '../services/favAdsService'
import { getComments } from '../services/commentsService'
import AdsList from '../components/AdsList'
import ShareAdSide from '../components/ShareAdSide'
import UserCardSide from '../components/UserCardSide'
import AdActionsSide from '../components/AdActionsSide'
import AdMainContent from '../components/AdMainContent'
import { Link } from 'react-router-dom'
import AdPrivacyNote from '../components/AdPrivacyNote'
import Comment from '../components/Comment'
import LoadingButton from '../components/common/LoadingButton'
import { isAuthenticated } from '../utils/helper'
import ReportModal from '../components/ReportModal'
import { t } from '../utils/helper'
import AuthContext from '../contexts/AuthContext'

const AdScreen = ({ match, history }) => {
  const { lang } = useContext(AuthContext)

  const [ad, setAd] = useState({})
  const [relatedAds, setRelatedAds] = useState([])
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [isProcessingLike, setIsProcessingLike] = useState(false)
  const [isProcessingFavorite, setIsProcessingFavorite] = useState(false)
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false)
  const [isAllCommentsLoaded, setIsAllCommentsLoaded] = useState(false)
  const [commentsPage, setCommentsPage] = useState(1)

  const [showReportModal, setShowReportModal] = useState(false)

  const id = match.params.id

  useEffect(() => {
    async function fetchData() {
      try {
        const ad = await getAd(id)
        setAd(ad)
        setIsLoading(false)
      } catch (ex) {
        toast.error(ex.message || ex.toString())
        history.replace('/not-found')
      }
    }

    async function fetchRelatedAds() {
      try {
        const ads = await getRelatedAds(id)
        setRelatedAds(ads)
      } catch (ex) {}
    }

    setIsLoading(true)
    fetchData()
    fetchComments()
    fetchRelatedAds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, history])

  // async function increaseViews() {
  //   try {
  //     console.log('Increasing views')
  //     const { newViewsCount, message } = await increaseAdViews(id)
  //     const updatedAd = { ...ad }
  //     updatedAd.likesCount = newViewsCount
  //     setAd(updatedAd)
  //     toast.success('Increase Views Succeed - '.message)
  //   } catch (ex) {
  //     const errorString = ex.message || ex.toString()
  //     toast.error(errorString)
  //   }
  // }

  async function fetchComments(page = 1) {
    try {
      if (page > 1) setIsLoadingMoreComments(true)
      const newComments = await getComments(id, page)
      if (page === 1) {
        setComments(newComments)
      } else {
        const allComments = [...comments, ...newComments]
        setComments(allComments)
      }
      setCommentsPage(page)
      setIsLoadingMoreComments(false)
      if (newComments.length === 0) setIsAllCommentsLoaded(true)
    } catch (ex) {
      const errorString = ex.message || ex.toString()
      toast.error(errorString)
      if (isLoadingMoreComments) setIsLoadingMoreComments(false)
    }
  }

  const onToggleLike = async () => {
    if (!isAuthenticated()) return history.replace('/login')

    try {
      setIsProcessingLike(true)
      const { newLikesCount, message } = await toggleLike(id)
      const updatedAd = { ...ad }
      updatedAd.likesCount = newLikesCount
      updatedAd.isLiked = !updatedAd.isLiked
      setAd(updatedAd)
      setIsProcessingLike(false)
      toast.success(message)
    } catch (ex) {
      toast.error(ex.message || ex.toString())
      setIsProcessingLike(false)
    }
  }

  const onToggleFavorite = async () => {
    if (!isAuthenticated()) return history.replace('/login')

    try {
      setIsProcessingFavorite(true)
      const { isFavourite, message } = await toggleFavorite(id)
      const updatedAd = { ...ad }
      updatedAd.isFavourite = isFavourite
      setAd(updatedAd)
      setIsProcessingFavorite(false)
      toast.success(message)
    } catch (ex) {
      toast.error(ex.message || ex.toString())
      setIsProcessingFavorite(false)
    }
  }

  const onToggleFollowSucceed = newState => {
    const updatedAd = { ...ad }
    updatedAd.user.isFollowing = newState
    setAd(updatedAd)
  }

  const onReport = () => {
    if (!isAuthenticated()) return history.replace('/login')
    setShowReportModal(true)
  }

  const loadMoreComments = async () => {
    const newPage = commentsPage + 1
    fetchComments(newPage)
  }

  const getAdTree = () => {
    // {key, value, link(optional)}
    const tree = []
    if (ad.category)
      tree.push({
        key: t('category'),
        value: ad.category.title[lang],
        link: `/categories/${ad.category._id}`,
      })

    if (ad.subcategory)
      tree.push({
        key: t('subcategory'),
        value: ad.subcategory?.title[lang],
      })

    if (ad.type)
      tree.push({
        key: t('type'),
        value: ad.type?.title?.[lang],
      })

    if (ad.region)
      tree.push({
        key: t('region'),
        value: ad.region?.title?.[lang],
      })

    if (ad.carMake)
      tree.push({
        key: t('make'),
        value: ad.carMake?.title,
      })

    if (ad.carModel)
      tree.push({
        key: t('model'),
        value: ad.carModel.title,
      })

    if (ad.carYear)
      tree.push({
        key: t('year'),
        value: ad.carYear,
      })

    if (ad.km)
      tree.push({
        key: t('km'),
        value: ad.km,
      })

    return tree
  }

  const { user } = ad
  const adTree = getAdTree()

  return (
    <Loader isLoading={isLoading}>
      <Container>
        {ad.category && (
          <Breadcrumb>
            <LinkContainer to="/">
              <Breadcrumb.Item>{t('home')}</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to="/categories">
              <Breadcrumb.Item>{t('categories')}</Breadcrumb.Item>
            </LinkContainer>
            <LinkContainer to={`/categories/${ad.category._id}`}>
              {/* <Breadcrumb.Item>ok {console.log(ad.category)}</Breadcrumb.Item> */}
               <Breadcrumb.Item>{ad.category.title[lang]}</Breadcrumb.Item> 
            </LinkContainer>
            <Breadcrumb.Item active>{ad.title}</Breadcrumb.Item>
          </Breadcrumb>
        )}

        <Row>
          <Col xs={12} lg={8}>
            {/* main content */}
            <AdMainContent ad={ad} />

            {/* Tree */}
            {adTree.length > 0 && (
              <Card className="bg-light text-center card py-2 px-3 mb-3">
                <Row>
                  {adTree.map((pair, index) => (
                    <Col key={`ad_tree_${index}`} xs={12} md={6} xl={4}>
                      <Card className="my-2">
                        <Card.Header>
                          <strong>{pair.key}</strong>
                        </Card.Header>
                        <Card.Body>
                          {pair.link ? (
                            <Link to={pair.link}>{pair.value}</Link>
                          ) : (
                            pair.value
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            )}

            <div className="d-lg-none">
              {/* User Card */}
              {user && (
                <UserCardSide
                  user={user}
                  onToggleFollowSucceed={onToggleFollowSucceed}
                  history={history}
                />
              )}

              <AdActionsSide
                ad={ad}
                onToggleLike={onToggleLike}
                isProcessingLike={isProcessingLike}
                onToggleFavorite={onToggleFavorite}
                isProcessingFavorite={isProcessingFavorite}
                onReport={onReport}
              />

              {/* Share/Side */}
              <ShareAdSide ad={ad} />
            </div>

            {/* Safety Tips */}
            <div className="d-lg-none">
              <AdPrivacyNote />
            </div>

            {/* Comments */}
            {comments.length > 0 && (
              <Card className="bg-light p-3 my-3">
                <h2 className="h4">{t('comments')}</h2>
                {comments.map(comment => (
                  <Comment key={comment._id} comment={comment} />
                ))}

                {isAllCommentsLoaded ? (
                  <p className="text-center mt-2">{t('no_more_comments')}</p>
                ) : (
                  <LoadingButton
                    className="mt-2"
                    isProcessing={isLoadingMoreComments}
                    onClick={loadMoreComments}
                  >
                    {t('load_more_comments')}
                  </LoadingButton>
                )}
              </Card>
            )}
          </Col>

          {/* Side Cards / Large Screens */}
          {user && (
            <Col xs={12} lg={4} className="d-none d-lg-block">
              <UserCardSide
                user={user}
                onToggleFollowSucceed={onToggleFollowSucceed}
                history={history}
              />

              {/* Actions */}
              <AdActionsSide
                ad={ad}
                onToggleLike={onToggleLike}
                isProcessingLike={isProcessingLike}
                onToggleFavorite={onToggleFavorite}
                isProcessingFavorite={isProcessingFavorite}
                onReport={onReport}
              />

              {/* Share/Side */}
              <ShareAdSide ad={ad} />

              {/* Safety Tips */}
              <AdPrivacyNote />
            </Col>
          )}
        </Row>

        {/* Related Ads */}
        {relatedAds.length > 0 && (
          <div>
            <h2 className="border-bottom pb-3 my-2">{t('related_ads')}</h2>
            <AdsList ads={relatedAds} />
          </div>
        )}
      </Container>

      <ReportModal
        show={showReportModal}
        adId={id}
        onHide={() => setShowReportModal(false)}
      />
    </Loader>
  )
}

export default AdScreen
