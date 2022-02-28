<template>
  <li
    id="notificationContainer"
    class="nav-item no-caret d-sm-block mr-3 dropdown-notifications bg-white"
    :class="{ show: open }"
    @mouseover="onOpenMenu"
  >
    <b-button v-if="isThereProductsOnCart" variant="transparent" @mouseover="onOpenMenu">
      <span class="text-indigo font-weight-bold mr-2 small">
        ¡Tienes {{ getTotalProductsCount }} productos esperando!
      </span>
      <b-icon icon="cart-check" variant="indigo" aria-hidden="true" scale="1.5" />
    </b-button>

    <div
      v-show="open"
      @mouseleave="onCloseMenu"
      class="dropdown-menu bg-white dropdown-menu-right border-0 shadow animated--fade-in-up"
      :class="{ show: open }"
    >
      <!-- Título -->
      <h6 class="dropdown-header dropdown-notifications-header bg-purple text-white">
        <i class="icon__md uil uil-shopping-bag mr-2"></i>
        Mi carrito
      </h6>

      <div v-if="isThereProductsOnCart">
        <a
          v-for="item in getPriceByGroupedProducts"
          :key="item.id"
          class="dropdown-item my-cursor dropdown-notifications-item bg-white"
        >
          <div v-for="detail in Object.values(item)" :key="detail.id">
            <div class="dropdown-notifications-item-content">
              <div class="dropdown-notifications-item-content-text font-weight-bolder text-purple">
                <p>{{ detail.product.name }}</p>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="dropdown-notifications-item-icon bg-white">
                <img :src="detail.product.attributes[0].icon" width="32" height="32" class="rounded-circle" alt="" />
              </div>
              <div class="d-flex flex-column">
                <div class="font-weight-bolder text-black">
                  <p class="mb-0">Cantidad: {{ detail.quantity }}</p>
                </div>
                <div class="font-weight-bolder text-black">
                  <p class="mb-0">Precio: {{ $formatNumber(detail.price) }}</p>
                </div>
                <div class="font-weight-bolder text-black">
                  <p class="mb-0">Subototal: {{ $formatNumber(detail.subtotal) }}</p>
                </div>
              </div>
            </div>
            <div class="dropdown-notifications-item-content ml-3"></div>
          </div>
        </a>
      </div>

      <!-- Ver todas las alertas -->
      <router-link
        :to="{ name: 'CartResume' }"
        class="bg-white nav-link dropdown-item my-cursor dropdown-notifications-footer"
      >
        Ver resúmen
      </router-link>
    </div>
  </li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationsDropDown',

  data () {
    return {
      open: false
    }
  },

  computed: mapGetters('productModule', [
    'getPriceByGroupedProducts',
    'isThereProductsOnCart',
    'getTotalProductsCount'
  ]),

  methods: {
    onOpenMenu () {
      this.open = true
    },

    onCloseMenu () {
      this.open = false
    }
  }
}
</script>
