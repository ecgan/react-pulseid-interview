import { useCallback, useEffect, useMemo, useReducer } from 'react'
import getQuery from './getQuery'
import reducer from './reducer'
import callFlickrEffect from './callFlickrEffect/callFlickrEffect'

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

  useEffect(() => {
    if (!state.loading) {
      return
    }

    return callFlickrEffect(state.query.text, state.query.min_taken_date, state.query.max_taken_date, state.query.page, dispatch)
  }, [state.loading, state.query.text, state.query.min_taken_date, state.query.max_taken_date, state.query.page, dispatch])

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
