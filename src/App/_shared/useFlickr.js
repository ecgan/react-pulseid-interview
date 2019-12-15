import { useReducer, useEffect } from 'react'
import flickr from './flickr'

const initialState = {
  loading: true,
  error: null,
  data: null,
  query: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'fire':
      if (action.query.page > 1) {
        return {
          loading: true,
          error: null,
          data: state.data,
          query: action.query
        }
      }

      return {
        loading: true,
        error: null,
        data: null,
        query: action.query
      }

    case 'error':
      return {
        loading: false,
        error: action.error,
        data: state.data,
        query: state.query
      }
    case 'success':
      if (action.data.photos.page > 1) {
        const newData = {
          ...action.data
        }

        newData.photos.photo.unshift(...state.data.photos.photo)

        return {
          loading: false,
          error: null,
          data: newData,
          query: state.query
        }
      }

      return {
        loading: false,
        error: null,
        data: action.data,
        query: state.query
      }
    default:
      return state
  }
}

const useFlickr = (query) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const text = query.text && query.text.trim()
  const minTakenDate = query.min_taken_date && query.min_taken_date.startOf('day').unix()
  const maxTakenDate = query.max_taken_date && query.max_taken_date.startOf('day').unix()
  const page = query.page

  useEffect(() => {
    dispatch({
      type: 'fire',
      query: {
        text,
        minTakenDate,
        maxTakenDate,
        page
      }
    })

    const hasNoQuery = !text && !minTakenDate && !maxTakenDate

    const req = hasNoQuery
      ? flickr.photos.getRecent({
        per_page: 30,
        page: page
      })
      : flickr.photos.search({
        text: text,
        min_taken_date: minTakenDate,
        max_taken_date: maxTakenDate,
        per_page: 30,
        page: page,
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
  }, [text, minTakenDate, maxTakenDate, page])

  return state
}

export default useFlickr
