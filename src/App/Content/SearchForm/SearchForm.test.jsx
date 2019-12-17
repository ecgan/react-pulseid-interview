import React from 'react'
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'
import { Form } from 'antd'

import SearchForm from './SearchForm'

test('SearchForm should contain search, from date and to date filters', () => {
  const WrappedSearchForm = Form.create()(SearchForm)
  const { queryByLabelText, queryByPlaceholderText } = render(
    <WrappedSearchForm />
  )

  const search = queryByLabelText('Search')
  const from = queryByPlaceholderText('From')
  const to = queryByPlaceholderText('To')

  expect(search).not.toBeNull()
  expect(from).not.toBeNull()
  expect(to).not.toBeNull()
})

test('to date should not be earlier than from date', async () => {
  Date.now = jest.fn(() => new Date(Date.UTC(2019, 0, 1)).valueOf())

  const WrappedSearchForm = Form.create()(SearchForm)
  const { queryByPlaceholderText, getByText } = render(
    <WrappedSearchForm />
  )

  const startDateInput = queryByPlaceholderText('From')
  fireEvent.click(startDateInput)

  const startDate15node = getByText('15')
  fireEvent.click(startDate15node)

  await waitForElementToBeRemoved(() => getByText('15'))

  expect(startDateInput).toHaveValue('2019-01-15')

  const endDateInput = queryByPlaceholderText('To')
  fireEvent.click(endDateInput)

  const endDate14node = getByText('14')
  expect(endDate14node).toHaveAttribute('aria-disabled', 'true')
})

test('start date should not be later than end date', async () => {
  Date.now = jest.fn(() => new Date(Date.UTC(2019, 0, 1)).valueOf())

  const WrappedSearchForm = Form.create()(SearchForm)
  const { queryByPlaceholderText, getByText } = render(
    <WrappedSearchForm />
  )

  const endDateInput = queryByPlaceholderText('To')
  fireEvent.click(endDateInput)

  const endDate15node = getByText('15')
  fireEvent.click(endDate15node)

  await waitForElementToBeRemoved(() => getByText('15'))

  expect(endDateInput).toHaveValue('2019-01-15')

  const startDateInput = queryByPlaceholderText('From')
  fireEvent.click(startDateInput)

  const startDate16node = getByText('16')
  expect(startDate16node).toHaveAttribute('aria-disabled', 'true')
})
