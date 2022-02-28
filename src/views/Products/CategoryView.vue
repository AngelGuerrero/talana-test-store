<template>
  <base-view :title="title" icon="slack">
    <product-list :category-id="categoryId" />
  </base-view>
</template>

<script>
export default {
  name: 'CategoryView',

  components: {
    ProductList: () => import('@/components/Products/ProductList.vue')
  },

  data () {
    return {
      title: '',
      categoryId: null
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler ({ params }) {
        this.categoryId = parseInt(params.id)
        this.onGetCategory(params.id)
      }
    }
  },

  methods: {
    async onGetCategory (id) {
      const { data } = await this.$store.dispatch('productModule/getProductCategoryById', id)
      this.title = data.name || ''
    }
  }
}
</script>
