import { Col, DatePicker, Form, Row } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import DebounceInput from '../_shared/DebounceInput/DebounceInput'
import PhotoSearch from './PhotoSearch/PhotoSearch'

const disableStartDate = (endDate) => (current) => {
  if (!endDate || !current) {
    return false
  }

  return current > endDate
}

const disableEndDate = (startDate) => (current) => {
  if (!startDate || !current) {
    return false
  }

  return current < startDate
}

const SearchForm = (props) => {
  const { form } = props
  const { getFieldDecorator, getFieldValue } = form

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
        <Form.Item
          label='Date Taken'
        >
          <Row
            gutter={16}
          >
            <Col
              span={12}
            >
              <Form.Item>
                {
                  getFieldDecorator('min_taken_date')(
                    <DatePicker
                      disabledDate={disableStartDate(getFieldValue('max_taken_date'))}
                      format='YYYY-MM-DD'
                      placeholder='From'
                      style={{ width: '100%' }}
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col
              span={12}
            >
              <Form.Item>
                {
                  getFieldDecorator('max_taken_date')(
                    <DatePicker
                      disabledDate={disableEndDate(getFieldValue('min_taken_date'))}
                      format='YYYY-MM-DD'
                      placeholder='To'
                      style={{ width: '100%' }}
                    />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
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
