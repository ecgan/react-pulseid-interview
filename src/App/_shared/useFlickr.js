import { useReducer, useEffect } from 'react'
import flickr from './flickr'

const initialState = {
  started: false,
  loading: true,
  error: null,
  data: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        started: true,
        loading: true,
        error: null,
        data: null
      }
    case 'error':
      return {
        started: true,
        loading: false,
        error: action.error,
        data: null
      }
    case 'success':
      return {
        started: true,
        loading: false,
        error: null,
        data: action.data
      }
    case 'abort':
      return {
        started: true,
        loading: false,
        error: null,
        data: null
      }
    default:
      return state
  }
}

const useFlickr = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.started === false) {
      dispatch({ type: 'start' })
      const req = flickr.photos.search({
        text: 'water',
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
    }
  })

  return state
}

export default useFlickr
