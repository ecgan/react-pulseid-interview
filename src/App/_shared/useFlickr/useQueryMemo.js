import { useMemo } from 'react'

const useQueryMemo = (formQuery) => {
  return useMemo(() => {
    return {
      text: formQuery.text && formQuery.text.trim(),
      min_taken_date: formQuery.min_taken_date && formQuery.min_taken_date.startOf('day').unix(),
      max_taken_date: formQuery.max_taken_date && formQuery.max_taken_date.endOf('day').unix()
    }
  }, [formQuery.max_taken_date, formQuery.min_taken_date, formQuery.text])
}

export default useQueryMemo
