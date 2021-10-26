import React, { useContext } from 'react'
import { Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { t } from '../utils/helper'
import { avatar } from '../utils/images'
import Moment from 'react-moment'
import AuthContext from '../contexts/AuthContext'

const Comment = ({ comment, ad }) => {
  const { lang } = useContext(AuthContext)
  const { user } = comment
  const isAuthorComment = ad && ad.user._id === user._id
  return (
    <Card className="p-3 my-2">
      <div className="d-flex flex-row">
        <Image
          className="shadow-sm w-10 h-10 mb-3"
          roundedCircle
          src={user.profilePhoto || avatar}
          width={50}
          height={50}
          alt="user profile photo"
        />

        <div className="px-3">
          <div>
            <Link to={`/users/${user._id}`}>
              <strong>
                {user.name} {isAuthorComment && `[${t('author')}]`}
              </strong>
            </Link>
          </div>
          <div>
            <strong>{user.mobile}</strong>
          </div>
          <div>
            <Moment format="D-M-YYYY - hh:mm a" locale={lang}>
              {comment.createdAt}
            </Moment>
          </div>
          <p className="mt-4 text-justify">{comment.text}</p>
        </div>
      </div>

      <span></span>
    </Card>
  )
}

export default Comment
