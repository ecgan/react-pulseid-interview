import React from 'react'
import { render } from '@testing-library/react'

import PhotoList from './PhotoList'

test('PhotoList with no photos should render text "No Data"', () => {
  const { queryByText } = render(
    <PhotoList
      photos={[]}
    />
  )

  const node = queryByText('No Data')

  expect(node).not.toBeNull()
})

test('PhotoList should render the photos with alt', () => {
  const photos = [
    { id: '49228050938', owner: '185677780@N06', secret: 'e938da6c5f', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228051303', owner: '185176283@N07', secret: '77e50265f6', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052073', owner: '99414504@N03', secret: 'd803c40081', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052113', owner: '185947672@N05', secret: '1ba0a8ab6e', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052318', owner: '183178725@N04', secret: 'c8b51d3b4a', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052918', owner: '77531522@N05', secret: '7b4327611a', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052928', owner: '185979450@N04', secret: '1d397be6b8', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228053658', owner: '147738390@N05', secret: 'af643ceeac', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 }
  ]

  const { queryAllByAltText } = render(
    <PhotoList
      photos={photos}
    />
  )

  const imgs = queryAllByAltText('photo title')

  expect(imgs).toHaveLength(8)
})

test('PhotoList should render the photos in rows of 3', () => {
  const photos = [
    { id: '49228050938', owner: '185677780@N06', secret: 'e938da6c5f', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228051303', owner: '185176283@N07', secret: '77e50265f6', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052073', owner: '99414504@N03', secret: 'd803c40081', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052113', owner: '185947672@N05', secret: '1ba0a8ab6e', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052318', owner: '183178725@N04', secret: 'c8b51d3b4a', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052918', owner: '77531522@N05', secret: '7b4327611a', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228052928', owner: '185979450@N04', secret: '1d397be6b8', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 },
    { id: '49228053658', owner: '147738390@N05', secret: 'af643ceeac', server: '65535', farm: 66, title: 'photo title', ispublic: 1, isfriend: 0, isfamily: 0 }
  ]

  const { container } = render(
    <PhotoList
      photos={photos}
    />
  )

  const cols = container.querySelectorAll('.ant-col-8')

  expect(cols).toHaveLength(8)
})
