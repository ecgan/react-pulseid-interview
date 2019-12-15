import { Result } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import useFlickr from '../../_shared/useFlickr'
import PhotoList from './PhotoList/PhotoList'

const PhotoSearch = (props) => {
  const { query, onLoadMore } = props
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
    <InfiniteScroll
      pageStart={1}
      loadMore={onLoadMore}
      hasMore={
        !loading &&
        query.page === data.photos.page &&
        data.photos.page < data.photos.pages
      }
      loader={<div className='loader' key={0}>Loading ...</div>}
    >
      <PhotoList
        photos={photos}
      />
    </InfiniteScroll>
  )
}

PhotoSearch.propTypes = {
  query: PropTypes.object,
  onLoadMore: PropTypes.func
}

export default PhotoSearch
