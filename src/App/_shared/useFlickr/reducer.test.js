import reducer from './reducer'

test('Call SET_NEW_QUERY', () => {
  const state = {}
  const action = {
    type: 'SET_NEW_QUERY',
    query: {
      text: 'hello'
    }
  }

  const result = reducer(state, action)

  expect(result).toStrictEqual({
    query: {
      text: 'hello',
      page: 1
    },
    loading: true,
    error: null,
    data: null
  })
})

test('Call FETCH_ERROR should change loading to false, set error, and no change to data', () => {
  const state = {
    query: {
      text: 'hello',
      page: 5
    },
    loading: true,
    error: null,
    data: 'This should be intact.'
  }
  const error = new Error('testing error')
  const action = {
    type: 'FETCH_ERROR',
    error: error
  }

  const result = reducer(state, action)

  expect(result).toStrictEqual({
    query: {
      text: 'hello',
      page: 5
    },
    loading: false,
    error: error,
    data: 'This should be intact.'
  })
})

test('Call FETCH_SUCCESS with initial null data should change loading to false, set error to null, and set data', () => {
  const state = {
    query: {
      text: 'hello',
      page: 1
    },
    loading: true,
    error: null,
    data: null
  }
  const data = {
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
  const action = {
    type: 'FETCH_SUCCESS',
    data: data
  }

  const result = reducer(state, action)

  expect(result).toStrictEqual({
    query: {
      text: 'hello',
      page: 1
    },
    loading: false,
    error: null,
    data: data
  })
})

test('Call FETCH_SUCCESS with existing data should change loading to false, set error to null, and set data to new data with old data prepended to photo array', () => {
  const existingData = {
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
  const state = {
    query: {
      text: 'hello',
      page: 2
    },
    loading: true,
    error: null,
    data: existingData
  }
  const newData = {
    photos: {
      page: 2,
      pages: 34,
      perpage: 30,
      photo: [
        { id: '49238011953', owner: '62805249@N07', secret: 'dbaa8be163', server: '65535', farm: 66, title: 'Belle manifestation a\u0300 Dijon. La lutte continue, le 17 de\u0301cembre \u00a9 2019 Charly photos Dijon_-56.jpg', ispublic: 1, isfriend: 0, isfamily: 0 },
        { id: '49238012253', owner: '97709533@N05', secret: '9c8cb73296', server: '65535', farm: 66, title: '_DSC0757-Edit.jpg', ispublic: 1, isfriend: 0, isfamily: 0 }
      ],
      total: 1000
    },
    stat: 'ok'
  }
  const action = {
    type: 'FETCH_SUCCESS',
    data: newData
  }

  const result = reducer(state, action)

  expect(result).toStrictEqual({
    query: {
      text: 'hello',
      page: 2
    },
    loading: false,
    error: null,
    data: {
      photos: {
        page: 2,
        pages: 34,
        perpage: 30,
        photo: [
          { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011953', owner: '62805249@N07', secret: 'dbaa8be163', server: '65535', farm: 66, title: 'Belle manifestation a\u0300 Dijon. La lutte continue, le 17 de\u0301cembre \u00a9 2019 Charly photos Dijon_-56.jpg', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238012253', owner: '97709533@N05', secret: '9c8cb73296', server: '65535', farm: 66, title: '_DSC0757-Edit.jpg', ispublic: 1, isfriend: 0, isfamily: 0 }
        ],
        total: 1000
      },
      stat: 'ok'
    }
  })
})

test('Call REQUEST_FETCH_MORE should increment query.page, set loading to true, set error to null, and do not change data', () => {
  const state = {
    query: {
      text: 'hello',
      page: 2
    },
    loading: false,
    error: null,
    data: {
      photos: {
        page: 2,
        pages: 34,
        perpage: 30,
        photo: [
          { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011953', owner: '62805249@N07', secret: 'dbaa8be163', server: '65535', farm: 66, title: 'Belle manifestation a\u0300 Dijon. La lutte continue, le 17 de\u0301cembre \u00a9 2019 Charly photos Dijon_-56.jpg', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238012253', owner: '97709533@N05', secret: '9c8cb73296', server: '65535', farm: 66, title: '_DSC0757-Edit.jpg', ispublic: 1, isfriend: 0, isfamily: 0 }
        ],
        total: 1000
      },
      stat: 'ok'
    }
  }

  const action = {
    type: 'REQUEST_FETCH_MORE'
  }

  const result = reducer(state, action)

  expect(result).toStrictEqual({
    query: {
      text: 'hello',
      page: 3
    },
    loading: true,
    error: null,
    data: {
      photos: {
        page: 2,
        pages: 34,
        perpage: 30,
        photo: [
          { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011953', owner: '62805249@N07', secret: 'dbaa8be163', server: '65535', farm: 66, title: 'Belle manifestation a\u0300 Dijon. La lutte continue, le 17 de\u0301cembre \u00a9 2019 Charly photos Dijon_-56.jpg', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238012253', owner: '97709533@N05', secret: '9c8cb73296', server: '65535', farm: 66, title: '_DSC0757-Edit.jpg', ispublic: 1, isfriend: 0, isfamily: 0 }
        ],
        total: 1000
      },
      stat: 'ok'
    }
  })
})

test('Call REFETCH should set loading to true, set error to null, and do not change query and data', () => {
  const state = {
    query: {
      text: 'hello',
      page: 3
    },
    loading: false,
    error: new Error('Request failed previously'),
    data: {
      photos: {
        page: 2,
        pages: 34,
        perpage: 30,
        photo: [
          { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011953', owner: '62805249@N07', secret: 'dbaa8be163', server: '65535', farm: 66, title: 'Belle manifestation a\u0300 Dijon. La lutte continue, le 17 de\u0301cembre \u00a9 2019 Charly photos Dijon_-56.jpg', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238012253', owner: '97709533@N05', secret: '9c8cb73296', server: '65535', farm: 66, title: '_DSC0757-Edit.jpg', ispublic: 1, isfriend: 0, isfamily: 0 }
        ],
        total: 1000
      },
      stat: 'ok'
    }
  }

  const action = {
    type: 'REFETCH'
  }

  const result = reducer(state, action)

  expect(result).toStrictEqual({
    query: {
      text: 'hello',
      page: 3
    },
    loading: true,
    error: null,
    data: {
      photos: {
        page: 2,
        pages: 34,
        perpage: 30,
        photo: [
          { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011953', owner: '62805249@N07', secret: 'dbaa8be163', server: '65535', farm: 66, title: 'Belle manifestation a\u0300 Dijon. La lutte continue, le 17 de\u0301cembre \u00a9 2019 Charly photos Dijon_-56.jpg', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238012253', owner: '97709533@N05', secret: '9c8cb73296', server: '65535', farm: 66, title: '_DSC0757-Edit.jpg', ispublic: 1, isfriend: 0, isfamily: 0 }
        ],
        total: 1000
      },
      stat: 'ok'
    }
  })
})

test('unknown action type should throw error', () => {
  const state = {
    query: {
      text: 'hello',
      page: 3
    },
    loading: false,
    error: new Error('Request failed previously'),
    data: {
      photos: {
        page: 2,
        pages: 34,
        perpage: 30,
        photo: [
          { id: '49238010843', owner: '10245465@N07', secret: '38e0fec9c2', server: '65535', farm: 66, title: '2019-12-18 #RobotLove #RobotTakeOver #RobotArt #marchoftherobots', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011243', owner: '95772289@N08', secret: '3db6f90e38', server: '65535', farm: 66, title: 'Visual expression', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238011953', owner: '62805249@N07', secret: 'dbaa8be163', server: '65535', farm: 66, title: 'Belle manifestation a\u0300 Dijon. La lutte continue, le 17 de\u0301cembre \u00a9 2019 Charly photos Dijon_-56.jpg', ispublic: 1, isfriend: 0, isfamily: 0 },
          { id: '49238012253', owner: '97709533@N05', secret: '9c8cb73296', server: '65535', farm: 66, title: '_DSC0757-Edit.jpg', ispublic: 1, isfriend: 0, isfamily: 0 }
        ],
        total: 1000
      },
      stat: 'ok'
    }
  }
  const action = {
    type: 'I_DONT_KNOW'
  }

  expect(() => {
    return reducer(state, action)
  }).toThrow('I_DONT_KNOW')
})
