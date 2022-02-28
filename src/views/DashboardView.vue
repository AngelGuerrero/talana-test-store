<template>
  <base-view
    icon=""
    title="Consulta nuestro catálogo"
    description="¡Y adquiere nuestros últimos productos disponibles!"
    header-type="overlap"
  >
    <!-- Main page content-->
    <div class="row">
      <div class="col-xl-4 mb-4" v-for="category in productCategories" :key="category.id">
        <router-link
          :to="{ name: 'Categories', params: { id: category.id, name: category.name } }"
          class="card lift h-100"
        >
          <div class="card-body d-flex justify-content-center flex-column">
            <div class="d-flex align-items-center justify-content-between">
              <div class="mr-3">
                <h5>{{ category.name }}</h5>
              </div>
              <img src="@/assets/img/illustrations/UnicornHead.svg" style="width: 8rem" />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </base-view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DashboardView',

  created () {
    this.$store.dispatch('productModule/getProductCategories')
  },

  computed: mapState('productModule', ['productCategories'])
}
</script>
