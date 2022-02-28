import Vue from 'vue'
import Resource from '@/api/Resource'

const MODULE_NAME = 'productModule'

const ENDPOINT_CATEGORIES = '/product-category/'
const categoriesResource = new Resource(ENDPOINT_CATEGORIES, MODULE_NAME)

const ENDPOINT_PRODUCTS = '/product/'
const productResource = new Resource(ENDPOINT_PRODUCTS, MODULE_NAME)

export default {
  namespaced: true,

  state: {
    productList: [],
    productCategories: [],
    productCart: []
  },

  getters: {
    isThereProductsOnCart: (state, getters) => getters.getTotalProductsCount > 0,

    getPriceByGroupedProducts: state => {
      const groupedCategories = []

      state.productCart.reduce((acc, { code }) => {
        const quantity = code.products.length
        const subtotal = quantity * code.price

        groupedCategories.push({
          [code.name]: {
            product: code.products[0],
            quantity,
            price: code.price,
            subtotal
          }
        })
        return code
      }, [])

      return groupedCategories.filter(item => item !== undefined)
    },

    getTotalPrice: (state, getters) => {
      let total = 0

      if (!getters.isThereProductsOnCart) return total

      getters.getPriceByGroupedProducts.forEach(item => {
        Object.values(item).forEach(product => {
          total += product.subtotal
        })
      })

      return total
    },

    getTotalProductsCount: state => {
      let products = 0

      state.productCart.forEach(cart => {
        products += cart.code.products.length
      })

      return products
    }
  },

  mutations: {
    setProductList (state, payload) {
      state.productList = payload
    },

    setProductCategories (state, payload) {
      state.productCategories = payload
    },

    setProductToCart (state, payload) {
      const code = payload.product.code

      const codeExists = state.productCart.find(item => item.code.name === code)

      if (!codeExists) {
        state.productCart.push({
          code: { name: code, products: [payload.product], price: payload.product.price }
        })
        return
      }

      codeExists.code.products.push(payload.product)
    },

    removeProductFromCart (state, product) {
      const code = product.code

      const codeExists = state.productCart.find(item => item.code.name === code)

      if (!codeExists) {
        return
      }

      const itemIndex = state.productCart.findIndex(item => item.code.name === code)

      // Modifica el objeto
      codeExists.code.products.pop()

      if (codeExists.code.products.length === 0) {
        state.productCart.splice(itemIndex, 1)
        return
      }

      Vue.set(state.productCart, itemIndex, codeExists)
    }
  },

  actions: {
    async getProductCategories ({ commit }) {
      const { error, message, data } = await categoriesResource.all({})

      if (error) return message

      commit('setProductCategories', data.data)

      return { error, message, data: data.data }
    },

    async getProductList ({ commit }) {
      const { error, message, data } = await productResource.all({})

      if (error) return message

      commit('setProductList', data.data)

      return { error, message, data: data.data }
    },

    async getProductCategoryById ({ context }, id) {
      const { error, message, data } = await categoriesResource.show(id)

      if (error) return message

      return { error, message, data: data.data }
    },

    checkoutProducts ({ state, getters }, total) {
      if (!getters.isThereProductsOnCart) {
        return false
      }
      // simulate checkout and get the response
      state.productCart = []
      return { error: false, message: '', data: total }
    }
  }
}
