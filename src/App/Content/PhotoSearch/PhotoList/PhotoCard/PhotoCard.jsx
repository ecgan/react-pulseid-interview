import { Card } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import PhotoAvatar from './PhotoAvatar/PhotoAvatar'
import styles from './PhotoCard.module.css'

const PhotoCard = (props) => {
  const { photo } = props

  return (
    <a
      href={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Card
        className={styles.photoCard}
        hoverable
        cover={
          <PhotoAvatar
            photo={photo}
          />
        }
      />
    </a>
  )
}

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired
}

export default PhotoCard
