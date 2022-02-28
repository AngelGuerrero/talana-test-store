<template>
  <nav
    class="
          topnav
          navbar
          navbar-expand
          shadow
          justify-content-between
          justify-content-sm-start
          navbar-light
          bg-white"
    id="sidenavAccordion"
  >
    <!-- * * * * * * Dimensions: Maximum height: 32px, maximum width: 240px-->
    <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">
      MyPuppyPet
    </router-link>

    <!-- Sidenav Toggle Button-->
    <button class="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" @click="toggleSidebar">
      <i class="icon__lg uil uil-bars text-indigo"></i>
    </button>

    <!-- Navbar Items-->
    <ul class="navbar-nav align-items-center ml-auto">
      <NotificationsDropDown />
    </ul>
  </nav>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',

  components: {
    NotificationsDropDown: () => import('@/components/Shared/NotificationsDropDown.vue')
  },

  data () {
    return {
      navbar: {
        show: false
      }
    }
  },

  methods: {
    ...mapMutations('UIModule', ['toggleSidebar'])
  }
}
</script>
