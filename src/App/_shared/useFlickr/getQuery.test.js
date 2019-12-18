import getQuery from './getQuery'
import moment from 'moment'

test('getQuery with no params should return empty object', () => {
  const result = getQuery()

  expect(result).toStrictEqual({
    max_taken_date: undefined,
    min_taken_date: undefined,
    text: undefined
  })
})

test('getQuery should return trimmed text, start day of min_taken_date, end day of max_taken_date', () => {
  const text = '   water fire   '
  const minTakenDate = moment('2019-12-01T14:08:09')
  const maxTakenDate = moment('2019-12-01T14:08:09')

  const result = getQuery(text, minTakenDate, maxTakenDate)

  expect(result).toStrictEqual({
    max_taken_date: 1575215999,
    min_taken_date: 1575129600,
    text: 'water fire'
  })
})
