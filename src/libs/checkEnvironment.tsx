export default function checkEnvironment() {
  const base_url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000'

  return base_url
}
