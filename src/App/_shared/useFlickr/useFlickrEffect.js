import { useEffect } from 'react'
import flickr from '../flickr'

const perPage = 30

const useFlickrEffect = (query, dispatch) => {
  const text = query.text && query.text.trim()
  const minTakenDate = query.min_taken_date && query.min_taken_date.startOf('day').unix()
  const maxTakenDate = query.max_taken_date && query.max_taken_date.startOf('day').unix()
  const page = query.page

  useEffect(() => {
    dispatch({
      type: 'FIRE',
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
        per_page: perPage,
        page: page
      })
      : flickr.photos.search({
        text: text,
        min_taken_date: minTakenDate,
        max_taken_date: maxTakenDate,
        per_page: perPage,
        page: page
      })

    req.then((res) => {
      dispatch({
        type: 'SUCCESS',
        data: res.body
      })
    }).catch((err) => {
      dispatch({
        type: 'ERROR',
        error: err
      })
    })

    return () => {
      req.abort()
    }
  }, [text, minTakenDate, maxTakenDate, page, dispatch])
}

export default useFlickrEffect
