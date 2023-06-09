import checkEnvironment from './checkEnvironment'

export async function getData(url: string, options: { method?: string } = {}) {
  const { method = 'GET' } = options
  const response = await fetch(checkEnvironment().concat(url), { method })
  const data = await response.json()
  return data
}
