import { Avatar } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const PhotoAvatar = (props) => {
  const { photo } = props

  return (
    <Avatar
      src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`}
      shape='square'
      size={75}
      alt={photo.title}
      title={photo.title}
    />
  )
}

PhotoAvatar.propTypes = {
  photo: PropTypes.object.isRequired
}

export default PhotoAvatar
