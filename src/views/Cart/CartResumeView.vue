<template>
  <base-view icon="shopping-cart" title="Mi carrito">
    <template #right-place>
      <div class="row">
        <b-button
          v-if="isThereProductsOnCart"
          size="sm"
          variant="success"
          @click="onCheckout"
          class="col-4 offset-8 right-content"
        >
          Pagar
          {{ $formatNumber(getTotalPrice) }}
        </b-button>
      </div>
    </template>

    <x-modal v-model="showModal" ok-only ok-title="Aceptar" ok-variant="success">
      <b-card>
        <b-card-title class="text-center text-success">
          Pagado
        </b-card-title>
        <b-card-body class="d-flex flex-column justify-content-center align-items-center">
          <b-icon-check-circle-fill scale="4" variant="success" class="mb-3"></b-icon-check-circle-fill>
          <p class="text-muted mt-4">Te hemos enviado los detalles a tu correo electrónico</p>
        </b-card-body>
      </b-card>
    </x-modal>

    <div class="card card-header-actions">
      <div class="card-header">
        Resúmen
      </div>
      <div class="card-body p-0 no-body">
        <CartList />
      </div>
    </div>
  </base-view>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartResumeView',

  components: {
    CartList: () => import('@/components/Cart/CartList')
  },

  data () {
    return {
      showModal: false
    }
  },

  computed: mapGetters('productModule', ['getTotalPrice', 'isThereProductsOnCart']),

  methods: {
    onCheckout () {
      const total = this.getTotalPrice
      this.$store.dispatch('productModule/checkoutProducts', total)

      this.$notify({ error: false, message: `El total a pagar es de ${this.$formatNumber(total)}` }, 'Pago', {
        status: 'success'
      })
      this.showModal = true
    }
  }
}
</script>
