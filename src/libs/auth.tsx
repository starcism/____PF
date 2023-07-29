import checkEnvironment from './checkEnvironment'

interface Response {
  status: number
  message: string
}

export async function withAuth(): Promise<{ status: number; message: string; newAccessToken?: string | null }> {
  try {
    const res = await fetch(checkEnvironment().concat('/api/auth/verification/authv4'), {
      method: 'POST',
      credentials: 'include',
      next: {
        revalidate: 3600 * 6 - 1800,
      },
    })
    const response: Response = await res.json()
    const newAccessToken = res.headers.get('Authorization')
    if (response.status === 500) {
      throw new Error(response.message)
    } else if (response.status === 401) {
      return {
        status: response.status,
        message: response.message,
      }
    } else {
      return {
        status: response.status,
        message: response.message,
        newAccessToken: newAccessToken,
      }
    }
  } catch (error) {
    throw new Error()
  }
}
