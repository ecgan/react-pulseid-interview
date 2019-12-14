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

    const hasNoQuery = (!query.text || !query.text.trim()) && !query.min_taken_date && !query.max_taken_date

    const req = hasNoQuery
      ? flickr.photos.getRecent({
        per_page: 30,
        page: 1
      })
      : flickr.photos.search({
        text: query.text && query.text.trim(),
        min_taken_date: query.min_taken_date && query.min_taken_date.startOf('day').unix(),
        max_taken_date: query.max_taken_date && query.max_taken_date.endOf('day').unix(),
        per_page: 30,
        page: 1,
        extras: 'date_taken'
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
