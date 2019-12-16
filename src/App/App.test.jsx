import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders React Image Gallery', () => {
  const { getByText } = render(<App />)
  const text = getByText('React Image Gallery')
  expect(text).toBeInTheDocument()
})
