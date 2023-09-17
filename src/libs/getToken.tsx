import checkEnvironment from "./checkEnvironment";

export default async function getToken() {
  try {
    const res = await fetch(checkEnvironment().concat('/api/auth/verification/authv4'), {
      method: 'POST',
      credentials: 'include',
    })
    if (res.status === 500 || res.status === 401) {
      return null;
    }
    const newAccessToken = res.headers.get('Authorization')
    return newAccessToken
  } catch (error) {
    return null;
  }
}