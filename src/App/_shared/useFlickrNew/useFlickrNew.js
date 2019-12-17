import { useReducer, useEffect, useMemo, useCallback } from 'react'
import flickr from '../flickr'

const getInitialState = (query) => {
  return {
    status: 'RUNNING',
    query: {
      ...query,
      page: 1
    },
    loading: true,
    error: null,
    data: null
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEW_QUERY':
      return {
        status: 'RUNNING',
        query: {
          ...action.query,
          page: 1
        },
        loading: true,
        error: null,
        data: null
      }

    case 'FETCH_ERROR':
      return {
        status: 'READY',
        query: state.query,
        loading: false,
        error: action.error,
        data: state.data
      }

    case 'FETCH_SUCCESS': {
      const newData = { ...action.data }

      if (state.data && state.data.photos.photo) {
        newData.photos.photo = [
          ...state.data.photos.photo,
          ...newData.photos.photo
        ]
      }

      return {
        status: 'READY',
        query: state.query,
        loading: false,
        error: null,
        data: newData
      }
    }

    case 'REQUEST_FETCH_MORE':
      return {
        status: 'RUNNING',
        query: {
          ...state.query,
          page: state.query.page + 1
        },
        loading: true,
        error: null,
        data: state.data
      }

    default:
      return state
  }
}

const perPage = 30

const useFlickrNew = (formQuery) => {
  const query = useMemo(() => {
    return {
      text: formQuery.text && formQuery.text.trim(),
      min_taken_date: formQuery.min_taken_date && formQuery.min_taken_date.startOf('day').unix(),
      max_taken_date: formQuery.max_taken_date && formQuery.max_taken_date.endOf('day').unix()
    }
  }, [formQuery.max_taken_date, formQuery.min_taken_date, formQuery.text])

  const [state, dispatch] = useReducer(reducer, getInitialState(query))

  useEffect(() => {
    dispatch({
      type: 'SET_NEW_QUERY',
      query: query
    })
  }, [query])

  useEffect(() => {
    if (state.status !== 'RUNNING') {
      return
    }

    const req = (!state.query.text && !state.query.min_taken_date && !state.query.max_taken_date)
      ? flickr.photos.getRecent({
        page: state.query.page,
        per_page: perPage
      })
      : flickr.photos.search({
        text: state.query.text,
        min_taken_date: state.query.min_taken_date,
        max_taken_date: state.query.max_taken_date,
        page: state.query.page,
        per_page: perPage
      })

    req.then((res) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        data: res.body
      })
    }).catch((err) => {
      dispatch({
        type: 'FETCH_ERROR',
        error: err
      })
    })

    return () => {
      req && req.abort()
    }
  }, [state.status, state.query.text, state.query.min_taken_date, state.query.max_taken_date, state.query.page])

  const fetchMore = useCallback(() => {
    dispatch({
      type: 'REQUEST_FETCH_MORE'
    })
  }, [])

  return {
    ...state,
    fetchMore
  }
}

export default useFlickrNew
