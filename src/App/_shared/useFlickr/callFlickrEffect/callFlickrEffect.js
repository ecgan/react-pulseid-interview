import flickr from './flickr'

const perPage = 30

const callFlickrEffect = (text, minTakenDate, maxTakenDate, page, dispatch) => {
  const req = (!text && !minTakenDate && !maxTakenDate)
    ? flickr.photos.getRecent({
      page: page,
      per_page: perPage
    })
    : flickr.photos.search({
      text: text,
      min_taken_date: minTakenDate,
      max_taken_date: maxTakenDate,
      page: page,
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
}

export default callFlickrEffect
