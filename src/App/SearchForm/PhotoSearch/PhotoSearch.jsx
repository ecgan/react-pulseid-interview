import { Result, Spin } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import useFlickr from '../../_shared/useFlickr'
import PhotoList from './PhotoList/PhotoList'

const PhotoSearch = (props) => {
  const { query } = props
  const { loading, error, data } = useFlickr(query)

  if (error) {
    return (
      <Result
        status='error'
        title='Request Failed'
        subTitle='Please try again later or contact system admin.'
      />
    )
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

PhotoSearch.propTypes = {
  query: PropTypes.object
}

export default PhotoSearch
