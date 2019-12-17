import PropTypes from 'prop-types'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import useFlickrNew from '../../_shared/useFlickrNew/useFlickrNew'
import PhotoList from './PhotoList/PhotoList'

const PhotoSearch = (props) => {
  const { query } = props
  const { loading, error, data, fetchMore } = useFlickrNew(query)

  const photos = (data && data.photos.photo) || []

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchMore}
      hasMore={(
        !loading &&
        (data && (data.photos.page < data.photos.pages))
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
  query: PropTypes.object
}

export default PhotoSearch
