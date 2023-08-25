export default function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes <= 60) {
    return `${minutes}분 전`;
  } else if (hours <= 24) {
    return `${hours}시간 전`;
  } else if (days <= 7) {
    return `${days}일 전`;
  } else {
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // MM 형식
    const day = ('0' + date.getDate()).slice(-2); // DD 형식
    return `${month}월 ${day}일`;
  }
}

// export default function formatDate(dateString: string, withTime: boolean = false) {
//   const date = new Date(dateString)
//   const today = new Date()

//   // 로컬 타임존을 한국 시간(KST)으로 설정
//   const localDate = new Date(date.getTime())
//   const hours = ('0' + localDate.getHours()).slice(-2) // HH 형식
//   const minutes = ('0' + localDate.getMinutes()).slice(-2) // MM 형식

//   if (localDate.toDateString() === today.toDateString()) {
//     // 오늘 날짜인 경우 시간과 분만 표시
//     return `${hours}:${minutes}` //HH:MM
//   } else if (localDate.getFullYear() === today.getFullYear()) {
//     // 올해인 경우 MM.DD HH:MM 형식으로 표시
//     const month = ('0' + (localDate.getMonth() + 1)).slice(-2) // MM 형식
//     const day = ('0' + localDate.getDate()).slice(-2) // DD 형식
//     if (withTime) {
//       return `${month}.${day} ${hours}:${minutes}`
//     }
//     return `${month}.${day}` // MM.DD
//   } else {
//     // 작년 이전인 경우 YY.MM.DD 형식으로 표시
//     const year = localDate.getFullYear().toString().substring(2) // YY 형식
//     const month = ('0' + (localDate.getMonth() + 1)).slice(-2) // MM 형식
//     const day = ('0' + localDate.getDate()).slice(-2) // DD 형식
//     if (withTime) {
//       return `${year}.${month}.${day} ${hours}:${minutes}`
//     }
//     return `${year}.${month}.${day}` // YY.MM.DD
//   }
// }
