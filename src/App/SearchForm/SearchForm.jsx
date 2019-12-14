import { Form } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import DebounceInput from '../_shared/DebounceInput/DebounceInput'
import PhotoSearch from './PhotoSearch/PhotoSearch'

const SearchForm = (props) => {
  const { form } = props
  const { getFieldDecorator } = form

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
              <DebounceInput />
            )
          }
        </Form.Item>
      </Form>
      <PhotoSearch
        query={form.getFieldsValue()}
      />
    </div>
  )
}

SearchForm.propTypes = {
  form: PropTypes.object
}

export default Form.create()(SearchForm)
