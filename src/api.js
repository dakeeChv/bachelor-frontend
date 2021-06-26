import axios from 'axios'
import store from './store/index'
import router from '@/router'

export default () => {
  const api = axios.create({
    baseURL: store.state.baseUrl,
    timeout: 7000,
    headers: {
      Authorization: `Bearer`,
      'auth-token': `${store.state.auth.token}`
    }
  })
  api.interceptors.response.use(null, (error) => {
    let path = '/error'
    switch (error.response.status) {
      case 401:
        path = '/error/401'
        break
      case 400:
        path = '/error/400'
        break
      case 403:
        path = '/error/403'
        break
      case 404:
        path = '/error/404'
        break
      default:
        path = '/error/500'
    }
    router.push(path)
    return Promise.reject(error)
  })
  return api
}

// const api = axios.create({
//   baseURL: store.state.baseUrl,
//   timeout: 7000,
//   headers: {
//     Authorization: `Bearer`
//   }
// })
// api.interceptors.response.use(null, (error) => {
//   let path = '/error'
//   switch (error.response.status) {
//     case 401:
//       path = '/login'
//       break
//     case 400:
//       path = '/error/400'
//       break
//     case 404:
//       path = '/error/404'
//       break
//     default:
//       path = '/error/508'
//   }
//   router.push(path)
//   return Promise.reject(error)
// })
// export default api
