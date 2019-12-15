import PropTypes from 'prop-types'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import useFlickr from '../../_shared/useFlickr/useFlickr'
import PhotoList from './PhotoList/PhotoList'

const PhotoSearch = (props) => {
  const { query, onLoadMore } = props
  const { loading, error, data } = useFlickr(query)

  const photos = (data && data.photos.photo) || []

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={onLoadMore}
      hasMore={(
        !loading && (
          data && (
            query.page === data.photos.page &&
            data.photos.page < data.photos.pages
          )
        )
      )}
    >
      <PhotoList
        photos={photos}
        loading={loading}
        error={error}
      />
    </InfiniteScroll>
  )
}

PhotoSearch.propTypes = {
  query: PropTypes.object,
  onLoadMore: PropTypes.func
}

export default PhotoSearch
