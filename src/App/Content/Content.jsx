import { Form } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import PhotoSearch from './PhotoSearch/PhotoSearch'
import SearchForm from './SearchForm/SearchForm'

const Content = (props) => {
  const { form } = props

  return (
    <div>
      <SearchForm
        form={form}
      />
      <PhotoSearch
        query={form.getFieldsValue()}
      />
    </div>
  )
}

Content.propTypes = {
  form: PropTypes.object
}

export default Form.create()(Content)
