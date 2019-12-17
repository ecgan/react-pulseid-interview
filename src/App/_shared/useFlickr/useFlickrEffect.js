import { useEffect } from 'react'
import flickr from '../flickr'

const perPage = 30

const useFlickrEffect = (state, dispatch) => {
  useEffect(() => {
    if (!state.loading) {
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
  }, [state.loading, state.query.text, state.query.min_taken_date, state.query.max_taken_date, state.query.page, dispatch])
}

export default useFlickrEffect
