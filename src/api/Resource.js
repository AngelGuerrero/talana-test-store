import service from '@/api/service'
import store from '@/store'

export default class {
  /**
   * URL del recurso a donde se realizarán las peticiones usando axios.
   */
  urlResource = null

  /**
   * Nombre del módulo vuex
   */
  moduleName = null

  withDebug = null

  withDebugResponse = null

  constructor (urlResource, moduleName) {
    this.urlResource = urlResource
    this.moduleName = moduleName
    this.withDebug = process.env.VUE_APP_LOCAL_DEBUG
    this.withDebugResponse = process.env.VUE_APP_LOCAL_DEBUG_RESOURCE_RESPONSE
  }

  async all (params, mutation = null) {
    const retval = { error: false, message: 'Datos obtenidos correctamente', data: null }

    if (this.withDebug) this._debugInitialReq('all', params)

    try {
      this._toggleLoadingState(mutation, true)
      const data = await service.get(this.urlResource, { params })
      retval.data = data
    } catch (error) {
      retval.error = true
      retval.message = error.response ? error.response.data.message : 'Ha ocurrido un error al obtener los datos'
    } finally {
      this._toggleLoadingState(mutation, false)
      if (this.withDebug) this._debugEndReq(retval)
    }

    return retval
  }

  async get (url, params, mutation) {
    const retval = { error: false, message: 'Datos obtenidos correctamente', data: null }

    if (this.withDebug) this._debugInitialReq('get', params)

    try {
      this._toggleLoadingState(mutation, true)
      const data = await service.get(url, { params })
      retval.data = data
    } catch (error) {
      retval.error = true
      retval.message = error.response ? error.response.data.message : 'Ha ocurrido un error al obtener los datos'
    } finally {
      this._toggleLoadingState(mutation, false)
      if (this.withDebug) this._debugEndReq(retval)
    }

    return retval
  }

  async show (id, params = null, mutation) {
    const retval = { error: false, message: 'Datos obtenidos correctamente', data: null }

    if (this.withDebug) this._debugInitialReq('get', params)

    try {
      this._toggleLoadingState(mutation, true)
      const data = await service.get(`${this.urlResource}${id}`, { params })
      retval.data = data
    } catch (error) {
      retval.error = true
      retval.message = error.response ? error.response.data.message : 'Ha ocurrido un error al obtener los datos'
    } finally {
      this._toggleLoadingState(mutation, false)
      if (this.withDebug) this._debugEndReq(retval)
    }

    return retval
  }

  async update (id, data = {}, mutation) {
    if (this.withDebug) this._debugInitialReq('update', { id, ...data })

    this._toggleLoadingState(mutation, true)
    data._method = 'PUT'
    const res = await service.put(`${this.urlResource}/${id}`, data)
    this._toggleLoadingState(mutation, false)

    if (this.withDebug) this._debugEndReq(res)

    return res
  }

  async create (data, mutation = null) {
    if (this.withDebug) this._debugInitialReq('create', data)

    this._toggleLoadingState(mutation, true)
    const res = await service.post(`${this.urlResource}`, data)
    this._toggleLoadingState(mutation, false)

    if (this.withDebug) this._debugEndReq(res)

    return res
  }

  async delete (id, mutation = null) {
    if (this.withDebug) this._debugInitialReq('delete', id)

    this._toggleLoadingState(mutation, true)
    const res = await service.delete(`${this.urlResource}/${id}`)
    this._toggleLoadingState(mutation, false)

    if (this.withDebug) this._debugEndReq(res)

    return res
  }

  _debugInitialReq (method, params = null) {
    console.group(`Debug request: ${this.moduleName}`)
    console.log(`module: ${this.moduleName} - method: ${method} - endpoint: ${this.urlResource}`)
    console.log('params:')
    console.log(JSON.stringify(params, null, 4))
    console.groupEnd()
  }

  _debugEndReq (res) {
    if (!this.withDebugResponse) return

    console.group(`Debug response: ${this.moduleName}`)
    console.log(JSON.stringify(res.data, null, 4))
    console.groupEnd()
  }

  _toggleLoadingState (mutation = null, value = null) {
    if (mutation === null) return

    store.commit(`${this.moduleName}/${mutation}`, value)
  }
}
