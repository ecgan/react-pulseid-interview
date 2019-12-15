import { Col, List, Result, Row, Spin } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import PhotoCard from './PhotoCard/PhotoCard'

const PhotoList = (props) => {
  const { photos, loading, error } = props

  return (
    <List
      loading={loading && photos.length === 0}
      style={{ width: 257, margin: 'auto' }}
      grid={{ gutter: 16, column: 3 }}
      dataSource={photos}
      renderItem={(item) => {
        return (
          <List.Item>
            <PhotoCard
              photo={item}
            />
          </List.Item>
        )
      }}
    >
      {
        (loading && photos.length > 0) &&
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
            style={{ padding: 0 }}
          />
      }
    </List>
  )
}

PhotoList.propTypes = {
  photos: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.object
}

export default PhotoList