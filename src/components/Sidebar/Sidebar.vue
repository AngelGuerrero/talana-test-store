<template>
  <div id="layoutSidenav_nav" class="no-selection">
    <nav class="sidenav shadow-right sidenav-light">
      <div class="sidenav-menu">
        <div class="nav accordion" id="accordionSidenav">
          <!-- Dashboard -->
          <div class="sidenav-menu-heading">Dashboard</div>
          <router-link :to="{ name: 'Dashboard' }" class="nav-link">
            <div class="nav-link-icon">
              <i class="icon text-indigo uil uil-house-user h5"></i>
            </div>
            Inicio
          </router-link>
          <!-- End Dashboard -->

          <!-- Categories -> Products -->
          <div class="sidenav-menu-heading">Categorías</div>
          <a
            data-toggle="collapse"
            data-target="#collapseCategories"
            aria-controls="collapseCategories"
            class="nav-link collapsed my-cursor"
            :class="activeAccordeon === 'categories' ? '' : 'collapsed'"
            :aria-expanded="activeAccordeon === 'categories' ? true : false"
          >
            <div class="nav-link-icon">
              <i class="icon h5 text-indigo uil uil-tag"></i>
            </div>
            Productos
            <div class="sidenav-collapse-arrow">
              <i class="fas fa-angle-down"></i>
            </div>
          </a>
          <div
            id="collapseCategories"
            data-parent="#accordionSidenav"
            :class="activeAccordeon === 'categories' ? 'collapse show' : 'collapse'"
          >
            <nav class="sidenav-menu-nested nav accordion" id="accordionSidenavCategories">
              <router-link
                class="nav-link text-black"
                v-for="category in productCategories"
                :to="{ name: 'Categories', params: { id: category.id, name: category.name } }"
                :key="category.id"
              >
                {{ category.name }}
              </router-link>
            </nav>
          </div>
          <!-- End categories -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',

  created () {
    const currentRoute = this.$router.currentRoute
    this.activeAccordeon = currentRoute.meta.accordeon || ''

    this.$store.dispatch('productModule/getProductCategories')
  },

  data () {
    return {
      activeAccordeon: ''
    }
  },

  computed: {
    ...mapState('productModule', ['productCategories'])
  }
}
</script>
