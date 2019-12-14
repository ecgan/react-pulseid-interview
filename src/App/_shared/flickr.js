import Flickr from 'flickr-sdk'
import config from './config'

const flickr = new Flickr(config.flickerApiKey)

export default flickr
