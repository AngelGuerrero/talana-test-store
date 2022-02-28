<template>
  <b-row>
    <div v-if="selectedProduct">
      <XModal v-model="showModal" title="Detalle de producto">
        <ProductDetail :product="selectedProduct" show-details />

        <template #modal-footer="{ close }">
          <div class="w-100 d-flex justify-content-between">
            <XInputGroupProductAdd
              type="text"
              :item="selectedProduct"
              :value="selectedProduct.name"
              :initial-items-value="null"
              @on-submit="close"
              @on-added="onAdded"
            />
            <b-button @click="close" variant="black" class="ml-3" size="sm">Cerrar</b-button>
          </div>
        </template>
      </XModal>
    </div>

    <b-row v-if="getProducts.length > 0">
      <div v-for="product in getProducts" :key="product.id" class="mb-4" :class="`col col-lg-${getColumnsSize}`">
        <a class="my-cursor text-decoration-none" @click="onSelectProduct(product)">
          <ProductDetail :product="product" />
        </a>
      </div>
    </b-row>
  </b-row>
</template>

<script>
export default {
  name: 'ProductList',

  components: {
    ProductDetail: () => import('@/components/Products/ProductDetail'),
    XInputGroupProductAdd: () => import('@/components/Shared/XInputGroupProductAdd')
  },

  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },

  created () {
    this.onGetProducts()
  },

  data () {
    return {
      productList: [],
      showModal: false,
      selectedProduct: null
    }
  },

  watch: {
    categoryId () {
      this.onGetProducts()
    }
  },

  computed: {
    getProducts () {
      return this.productList.filter(el => el.category.id === this.categoryId) || []
    },
    getColumnsSize () {
      return this.getProducts.length > 0 ? 12 / this.getProducts.length + 1 : 12
    }
  },

  methods: {
    async onGetProducts () {
      const { error, message, data } = await this.$store.dispatch('productModule/getProductList')

      if (error) return this.$notify({ error, message }, 'Productos', { status: error ? 'danger' : 'success' })

      this.productList = data
    },

    onSelectProduct (product) {
      this.selectedProduct = product
      this.showModal = true
    },

    onAdded ({ product, quantity }) {
      this.$notify(
        { error: false, message: `${quantity} '${product.name}' agregado${quantity > 1 ? 's' : ''}` },
        'Productos',
        {
          status: 'success'
        }
      )
    }
  }
}
</script>
