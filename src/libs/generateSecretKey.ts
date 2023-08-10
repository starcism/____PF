function generateRandomBytes(length: number) {
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);
  return randomBytes;
}

// 랜덤한 시크릿 키 생성 함수
export default function generateRandomSecretKey(length = 32) {
  const randomBytes = generateRandomBytes(length);
  return Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
}