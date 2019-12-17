import { useCallback, useEffect } from 'react'
import useFlickrEffect from './useFlickrEffect'
import useFlickrReducer from './useFlickrReducer'
import useQueryMemo from './useQueryMemo'

const useFlickr = (formQuery) => {
  const query = useQueryMemo(formQuery)
  const [state, dispatch] = useFlickrReducer(query)

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
