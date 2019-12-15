import { useReducer } from 'react'

const initialState = {
  loading: true,
  error: null,
  data: null,
  query: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FIRE':
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

    case 'ERROR':
      return {
        loading: false,
        error: action.error,
        data: state.data,
        query: state.query
      }
    case 'SUCCESS':
      if (action.data.photos.page > 1) {
        const newData = {
          ...action.data
        }

        newData.photos.photo = [
          ...state.data.photos.photo,
          ...newData.photos.photo
        ]

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

const useFlickrReducer = () => {
  return useReducer(reducer, initialState)
}

export default useFlickrReducer
