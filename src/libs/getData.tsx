import checkEnvironment from './checkEnvironment'

export async function getData(url: string, options: { method?: string } = {}) {
  const { method = 'GET' } = options
  const response = await fetch(checkEnvironment().concat(url), { method })

  if (!response.ok) {
    throw new Error('there is no content')
  }

  const data = await response.json()
  return data
}
