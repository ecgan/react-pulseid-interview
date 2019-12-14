import React from 'react'
import useFlickr from '../_shared/useFlickr'
import PhotoAvatar from './PhotoAvatar/PhotoAvatar'

const Content = () => {
  const { loading, error, data } = useFlickr()

  if (loading) {
    return <span>Loading...</span>
  }

  if (error) {
    return <span>Error</span>
  }

  return (
    <div>
      {
        data.photos.photo.map(p => {
          return (
            <PhotoAvatar
              key={p.id}
              photo={p}
            />
          )
        })
      }
    </div>
  )
}

export default Content
