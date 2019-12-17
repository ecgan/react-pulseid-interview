import useFlickrEffect from './useFlickrEffect'
import useFlickrReducer from './useFlickrReducer'

const useFlickr = (query) => {
  const [state, dispatch] = useFlickrReducer()
  useFlickrEffect(query, dispatch)

  return state
}

export default useFlickr
