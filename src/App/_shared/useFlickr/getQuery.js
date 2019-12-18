const getQuery = (text, minTakenDate, maxTakenDate) => {
  return {
    text: text && text.trim(),
    min_taken_date: minTakenDate && minTakenDate.startOf('day').unix(),
    max_taken_date: maxTakenDate && maxTakenDate.endOf('day').unix()
  }
}

export default getQuery
