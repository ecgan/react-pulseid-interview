import Flickr from 'flickr-sdk'
import config from '../../config'

const flickr = new Flickr(config.flickrApiKey)

export default flickr
