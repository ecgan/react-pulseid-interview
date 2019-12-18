import callFlickrEffect from './callFlickrEffect'
import flickr from './flickr'
import moment from 'moment'

jest.mock('./flickr')

test('callFlickrEffect with no text, minTakenDate and maxTakenDate should call getRecent method', (done) => {
  const text = undefined
  const minTakenDate = undefined
  const maxTakenDate = undefined
  const page = 1

  flickr.photos.getRecent.mockImplementation(() => {
    return Promise.resolve({
      body: {
        photos: {
          page: 1,
          pages: 34,
          perpage: 30,
          photo: [
            { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
            { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 }
          ],
          total: 1000
        },
        stat: 'ok'
      }
    })
  })

  expect.assertions(1)
  callFlickrEffect(text, minTakenDate, maxTakenDate, page, (res) => {
    expect(res.body.stat).toBe('ok')
    done()
  })
})

test('callFlickrEffect with text only should call search method', (done) => {
  const text = 'hello'
  const minTakenDate = undefined
  const maxTakenDate = undefined
  const page = 1

  flickr.photos.search.mockImplementation(() => {
    return Promise.resolve({
      body: {
        photos: {
          page: 1,
          pages: 34,
          perpage: 30,
          photo: [
            { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
            { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 }
          ],
          total: 1000
        },
        stat: 'ok'
      }
    })
  })

  expect.assertions(1)
  callFlickrEffect(text, minTakenDate, maxTakenDate, page, (res) => {
    expect(res.body.stat).toBe('ok')
    done()
  })
})

test('callFlickrEffect with minTakenDate only should call search method', (done) => {
  const text = undefined
  const minTakenDate = moment('2019-12-01')
  const maxTakenDate = undefined
  const page = 1

  flickr.photos.search.mockImplementation(() => {
    return Promise.resolve({
      body: {
        photos: {
          page: 1,
          pages: 34,
          perpage: 30,
          photo: [
            { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
            { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 }
          ],
          total: 1000
        },
        stat: 'ok'
      }
    })
  })

  expect.assertions(1)
  callFlickrEffect(text, minTakenDate, maxTakenDate, page, (res) => {
    expect(res.body.stat).toBe('ok')
    done()
  })
})

test('callFlickrEffect with maxTakenDate only should call search method', (done) => {
  const text = undefined
  const minTakenDate = undefined
  const maxTakenDate = moment('2019-12-12')
  const page = 1

  flickr.photos.search.mockImplementation(() => {
    return Promise.resolve({
      body: {
        photos: {
          page: 1,
          pages: 34,
          perpage: 30,
          photo: [
            { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
            { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 }
          ],
          total: 1000
        },
        stat: 'ok'
      }
    })
  })

  expect.assertions(1)
  callFlickrEffect(text, minTakenDate, maxTakenDate, page, (res) => {
    expect(res.body.stat).toBe('ok')
    done()
  })
})
