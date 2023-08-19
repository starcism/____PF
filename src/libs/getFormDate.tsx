export default function formatDate(dateString: string, withTime: boolean = false) {
  const date = new Date(dateString)
  const today = new Date()

  // 로컬 타임존을 한국 시간(KST)으로 설정
  // const offset = -9 * 60 // 한국은 UTC+9:00
  const localDate = new Date(date.getTime())
  const hours = ('0' + localDate.getHours()).slice(-2) // HH 형식
  const minutes = ('0' + localDate.getMinutes()).slice(-2) // MM 형식

  if (localDate.toDateString() === today.toDateString()) {
    // 오늘 날짜인 경우 시간과 분만 표시
    return `${hours}:${minutes}` //HH:MM
  } else if (localDate.getFullYear() === today.getFullYear()) {
    // 올해인 경우 MM.DD 형식으로 표시
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2) // MM 형식
    const day = ('0' + localDate.getDate()).slice(-2) // DD 형식
    if (withTime) {
      return `${month}.${day} ${hours}:${minutes}`
    }
    return `${month}.${day}` // MM.DD
  } else {
    // 작년 이전인 경우 YY.MM.DD 형식으로 표시
    const year = localDate.getFullYear().toString().substring(2) // YY 형식
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2) // MM 형식
    const day = ('0' + localDate.getDate()).slice(-2) // DD 형식
    if (withTime) {
      return `${year}.${month}.${day} ${hours}:${minutes}`
    }
    return `${year}.${month}.${day}` // YY.MM.DD
  }
}
