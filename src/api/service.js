import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_AXIOS_PROD_BASE_URL
    : process.env.VUE_APP_AXIOS_LOCAL_BASE_URL

const service = axios.create({
  baseURL
})

const _debug = error => {
  console.error('')
  console.group('Debug error response')
  console.log(`MESSAGE: ${error.message}`)
  console.log(`BASE URL: ${error.config.baseURL}`)
  console.log(`URL: ${error.config.url}`)
  console.log(`METHOD: ${error.config.method}`)
  console.log(`PAYLOAD: ${error.config.data}`)
  console.error(`RESPONSE DATA: ${JSON.stringify(error.response.data.data, null, 4)}`)
  console.log(`RESPONSE MESSAGE: ${error.response.data.message}`)
  console.groupEnd()
  console.error('')
}

const _debugResponse = res => {
  console.log('')
  console.group('Debug service response')
  console.log(`MESSAGE: ${res.statusText}`)
  console.log(`STATUS: ${res.status}`)
  console.log(`BASE URL: ${res.config.baseURL}`)
  console.log(`URL: ${res.config.url}`)
  console.log(`METHOD: ${res.config.method}`)
  console.log(`PARAMS: ${JSON.stringify(res.config.params, null, 4)}`)
  console.log(`RESPONSE DATA: ${JSON.stringify(res.data, null, 4)}`)
  console.groupEnd()
  console.log('')
}

service.interceptors.response.use(
  response => {
    if (process.env.VUE_APP_LOCAL_DEBUG_SERVICE_RESPONSE) _debugResponse(response)

    return Promise.resolve(response)
  },

  error => {
    if (process.env.VUE_APP_LOCAL_DEBUG_SERVICE_RESPONSE) _debug(error)

    return Promise.reject(error)
  }
)

export default service
