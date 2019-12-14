import React from 'react'
import useFlickr from '../_shared/useFlickr'
import PhotoList from './PhotoList/PhotoList'
import { Spin } from 'antd'

const Content = () => {
  const { loading, error, data } = useFlickr()

  if (error) {
    return <span>Error</span>
  }

  const photos = (data && data.photos.photo) || []

  return (
    <Spin
      spinning={loading}
    >
      <PhotoList
        photos={photos}
      />
    </Spin>
  )
}

export default Content
