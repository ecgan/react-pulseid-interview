import { Button, Col, Result, Row, Spin } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import useFlickr from '../../_shared/useFlickr/useFlickr'
import PhotoList from './PhotoList/PhotoList'

const PhotoSearch = (props) => {
  const { query } = props
  const { loading, error, data, fetchMore, refetch } = useFlickr(query)

  return (
    <InfiniteScroll
      pageStart={1}
      loadMore={fetchMore}
      hasMore={(
        !loading &&
        !error &&
        (data && (data.photos.page < data.photos.pages))
      )}
    >
      {
        (data) &&
          <PhotoList
            photos={data.photos.photo}
          />
      }
      {
        (
          data &&
          data.photos.photo.length > 0 &&
          data.photos.page >= data.photos.pages
        ) &&
          <Result
            title='End of result.'
            subTitle='End of result.'
          />
      }
      {
        (loading) &&
          <Row>
            <Col
              span={24}
              style={{ textAlign: 'center' }}
            >
              <Spin />
            </Col>
          </Row>
      }
      {
        (error) &&
          <Result
            status='error'
            title='Request Failed'
            subTitle='Please try again later or contact system admin.'
            style={{ padding: 16 }}
            extra={[
              <Button
                key={0}
                type='primary'
                onClick={refetch}
              >
                Try again
              </Button>
            ]}
          />
      }
    </InfiniteScroll>
  )
}

PhotoSearch.propTypes = {
  query: PropTypes.object
}

export default PhotoSearch
