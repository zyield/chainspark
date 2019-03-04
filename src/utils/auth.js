import { BASE_URL, API_SECRET } from './constants'

const saveToken = token => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const loginUser = ({ email, password }) => {
  let opts = {
    method: 'post',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Chainspark-secret': API_SECRET
    },
    body: JSON.stringify({
      session: {
        email,
        password
      }
    })
  }

  return fetch(`${BASE_URL}/api/auth/login`, opts)
    .then(res => {
      if (res.status !== 200) {
        alert('Please double check your login/password')
        return { jwt: null }
      }

      return res.json()
    })
    .then(({ jwt }) => jwt ? saveToken(jwt) : 403)
}

export const logoutUser = () =>
  new Promise(resolve => resolve(localStorage.removeItem('token')))

export const isAuthenticated = () => Boolean(getToken())
