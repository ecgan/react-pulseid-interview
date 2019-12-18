const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEW_QUERY':
      return {
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
        query: state.query,
        loading: false,
        error: null,
        data: newData
      }
    }

    case 'REQUEST_FETCH_MORE':
      return {
        query: {
          ...state.query,
          page: state.query.page + 1
        },
        loading: true,
        error: null,
        data: state.data
      }

    case 'REFETCH':
      return {
        query: state.query,
        loading: true,
        error: null,
        data: state.data
      }

    default:
      throw new Error(`Unknown action.type ${action.type} in reducer.`)
  }
}

export default reducer
