export default function formatDate(dateString: string, toFullDate: boolean = false) {
  const date = new Date(dateString)
  const now = new Date()
  const timeDifference = now.getTime() - date.getTime()
  const minutes = Math.floor(timeDifference / (1000 * 60)) + 1
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (toFullDate) {
    const localDate = new Date(date.getTime())
    // const hours = ('0' + localDate.getHours()).slice(-2) // HH 형식
    // const minutes = ('0' + localDate.getMinutes()).slice(-2) // MM 형식
    const year = localDate.getFullYear().toString().substring(2) // YY 형식
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2) // MM 형식
    const day = ('0' + localDate.getDate()).slice(-2) // DD 형식
    return `${year}.${month}.${day}` // YY.MM.DD
  } else if (minutes < 60) {
    return `${minutes}분 전`
  } else if (hours <= 24) {
    return `${hours}시간 전`
  } else if (days <= 7) {
    return `${days}일 전`
  } else {
    const month = ('0' + (date.getMonth() + 1)).slice(-2) // MM 형식
    const day = ('0' + date.getDate()).slice(-2) // DD 형식
    return `${month}월 ${day}일`
  }
}