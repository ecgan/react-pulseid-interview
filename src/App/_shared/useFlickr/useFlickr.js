import { useCallback, useEffect, useMemo, useReducer } from 'react'
import getQuery from './getQuery'
import reducer from './reducer'
import useFlickrEffect from './useFlickrEffect'

const useFlickr = (formQuery) => {
  const query = useMemo(() => {
    return getQuery(formQuery.text, formQuery.min_taken_date, formQuery.max_taken_date)
  }, [formQuery.max_taken_date, formQuery.min_taken_date, formQuery.text])

  const [state, dispatch] = useReducer(reducer, {
    query: {
      ...query,
      page: 1
    },
    loading: true,
    error: null,
    data: null
  })

  useEffect(() => {
    dispatch({
      type: 'SET_NEW_QUERY',
      query: query
    })
  }, [dispatch, query])

  useFlickrEffect(state, dispatch)

  const fetchMore = useCallback(() => {
    dispatch({
      type: 'REQUEST_FETCH_MORE'
    })
  }, [dispatch])

  const refetch = useCallback(() => {
    dispatch({
      type: 'REFETCH'
    })
  }, [dispatch])

  return {
    ...state,
    fetchMore,
    refetch
  }
}

export default useFlickr
