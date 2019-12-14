import { Card } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import PhotoAvatar from './PhotoAvatar/PhotoAvatar'
import styles from './PhotoCard.module.css'

const PhotoCard = (props) => {
  const { photo } = props

  return (
    <Card
      className={styles.photoCard}
      hoverable
      cover={
        <PhotoAvatar
          photo={photo}
        />
      }
    />
  )
}

PhotoCard.propTypes = {
  photo: PropTypes.object.isRequired
}

export default PhotoCard
