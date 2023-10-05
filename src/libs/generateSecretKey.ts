function generateRandomBytes(length: number) {
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);
  return randomBytes;
}

export default function generateRandomSecretKey(length = 32) {
  const randomBytes = generateRandomBytes(length);
  return Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
}