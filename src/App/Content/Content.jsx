import { Form } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import PhotoSearch from './PhotoSearch/PhotoSearch'
import SearchForm from './SearchForm/SearchForm'

const Content = (props) => {
  const { form } = props
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form

  getFieldDecorator('page', {
    initialValue: 1
  })

  return (
    <div>
      <SearchForm
        form={form}
      />
      <PhotoSearch
        query={form.getFieldsValue()}
        onLoadMore={() => {
          const page = getFieldValue('page')

          setFieldsValue({
            page: page + 1
          })
        }}
      />
    </div>
  )
}

Content.propTypes = {
  form: PropTypes.object
}

export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    const { form } = props

    if (
      (changedValues.text || changedValues.min_taken_date || changedValues.max_taken_date) &&
      allValues.page > 1
    ) {
      form.setFieldsValue({
        ...changedValues,
        page: 1
      })
    }
  }
})(Content)
