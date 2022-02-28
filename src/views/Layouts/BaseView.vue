<template>
  <div>
    <!-- nav-fixed  -->
    <div id="wrapper" class="nav-fixed">
      <navbar />

      <div id="layoutSidenav">
        <sidebar />

        <div id="layoutSidenav_content" @click="toggleSidebar">
          <main class="pb-5">
            <!-- Cabecera del contenido principal -->
            <slot name="header">
              <HeaderType
                :icon="icon"
                :title="title"
                :description="description"
                :background="background"
                :header-type="headerType"
              >
                <template class="container-fluid" #right-place>
                  <slot name="right-place" />
                </template>
              </HeaderType>
            </slot>

            <!-- Contenido principal y slot principal -->
            <div :class="getHeaderType">
              <slot />
            </div>
          </main>

          <footer-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar/Navbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import FooterView from '@/views/Shared/FooterView'
import HeaderType from '@/components/Shared/HeaderType'
import $ from 'jquery'

export default {
  name: 'BaseView',

  props: {
    title: {
      type: String,
      default: ''
    },

    description: {
      type: String,
      default: ''
    },

    icon: {
      type: String,
      default: 'shield',
      required: false
    },

    background: {
      type: String,
      default: 'bg-gradient-purple-to-black',
      validator: function (value) {
        return (
          [
            'bg-gradient-primary-to-secondary',
            'bg-gradient-black-to-blue',
            'bg-gradient-black-to-red',
            'bg-gradient-black-to-green',
            'bg-gradient-black-to-purple',
            'bg-gradient-light-to-black',
            'bg-gradient-light-to-pink',
            'bg-gradient-purple-to-black'
          ].indexOf(value) !== -1
        )
      }
    },

    headerType: {
      type: String,
      default: 'compact',
      validator: function (value) {
        return ['compact', 'overlap', 'simplified'].indexOf(value) !== -1
      }
    }
  },

  components: {
    Navbar,
    Sidebar,
    FooterView,
    HeaderType
  },

  computed: {
    getHeaderType () {
      if (this.headerType === 'overlap') return 'container mt-n10'

      if (this.headerType === 'compact') return 'container-fluid'

      if (this.headerType === 'simplified') return 'container-fluid'

      return 'container-fluid'
    }
  },

  watch: {
    $router: {
      immediate: true,
      handler () {
        this.$store.commit('UIModule/setSidebarActive', false)
      }
    }
  },

  methods: {
    toggleSidebar () {
      if (window.innerWidth >= 992) return

      if (!$('body').hasClass('sidenav-toggled')) return

      this.$store.commit('UIModule/toggleSidebar')
    }
  }
}
</script>
