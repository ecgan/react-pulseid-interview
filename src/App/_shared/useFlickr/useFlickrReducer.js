import { useReducer } from 'react'

const getInitialState = (query) => {
  return {
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

    default:
      throw new Error(`Unknown action.type ${action.type} in reducer.`)
  }
}

const useFlickrReducer = (query) => {
  return useReducer(reducer, getInitialState(query))
}

export default useFlickrReducer
