import { useReducer, useEffect } from 'react'
import flickr from './flickr'

const initialState = {
  loading: true,
  error: null,
  data: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'fire':
      return initialState
    case 'error':
      return {
        loading: false,
        error: action.error,
        data: null
      }
    case 'success':
      return {
        loading: false,
        error: null,
        data: action.data
      }
    default:
      return state
  }
}

const useFlickr = (query) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({
      type: 'fire'
    })

    const req = query.text && query.text.trim()
      ? flickr.photos.search({
        text: query.text,
        per_page: 30,
        page: 1
      })
      : flickr.photos.getRecent({
        per_page: 30,
        page: 1
      })

    req.then((res) => {
      dispatch({
        type: 'success',
        data: res.body
      })
    }).catch((err) => {
      dispatch({
        type: 'error',
        error: err
      })
    })

    return () => {
      req.abort()
    }
  }, [query])

  return state
}

export default useFlickr
