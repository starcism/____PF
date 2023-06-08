export default function formatDate(dateString: string) {
  const date = new Date(dateString)
  const today = new Date()

  // 로컬 타임존을 한국 시간(KST)으로 설정
  const offset = -9 * 60 // 한국은 UTC+9:00
  const localDate = new Date(date.getTime() + offset * 60000)

  if (localDate.toDateString() === today.toDateString()) {
    // 오늘 날짜인 경우 시간과 분만 표시
    const hours = ('0' + localDate.getHours()).slice(-2) // HH 형식
    const minutes = ('0' + localDate.getMinutes()).slice(-2) // MM 형식
    return `${hours}:${minutes}` //HH:MM
  } else {
    // 오늘이 아닌 경우 YY.MM.DD 형식으로 표시
    const year = localDate.getFullYear().toString().substring(2) // YY 형식
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2) // MM 형식
    const day = ('0' + localDate.getDate()).slice(-2) // DD 형식
    return `${year}.${month}.${day}` //YY.MM.DD
  }
}
