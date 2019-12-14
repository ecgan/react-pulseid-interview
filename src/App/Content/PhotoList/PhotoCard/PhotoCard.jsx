import { Card } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import PhotoAvatar from './PhotoAvatar/PhotoAvatar'

const PhotoCard = (props) => {
  const { photo } = props

  return (
    <Card
      hoverable
      cover={
        <PhotoAvatar
          photo={photo}
        />
      }
      style={{ width: 75, height: 75 }}
    />
  )
}

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired
}

export default PhotoCard
