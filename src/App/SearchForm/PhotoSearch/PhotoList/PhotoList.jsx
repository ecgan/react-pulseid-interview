import { List, Spin, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import PhotoCard from './PhotoCard/PhotoCard'

const PhotoList = (props) => {
  const { photos, loading } = props

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
    </List>
  )
}

PhotoList.propTypes = {
  photos: PropTypes.array.isRequired,
  loading: PropTypes.bool
}

export default PhotoList
