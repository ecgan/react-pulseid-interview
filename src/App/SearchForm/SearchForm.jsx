import { Form, Input, Spin } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import useFlickr from '../_shared/useFlickr'
import PhotoList from './PhotoList/PhotoList'

const SearchForm = (props) => {
  const { form } = props
  const { getFieldDecorator } = form
  const { loading, error, data } = useFlickr()

  if (error) {
    return <span>Error</span>
  }

  const photos = (data && data.photos.photo) || []

  return (
    <div>
      <Form
        layout='vertical'
      >
        <Form.Item
          label='Search'
        >
          {
            getFieldDecorator('text')(
              <Input />
            )
          }
        </Form.Item>
      </Form>
      <Spin
        spinning={loading}
      >
        <PhotoList
          photos={photos}
        />
      </Spin>
    </div>
  )
}

SearchForm.propTypes = {
  form: PropTypes.object
}

export default Form.create()(SearchForm)
