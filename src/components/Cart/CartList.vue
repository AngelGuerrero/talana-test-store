<template>
  <div>
    <b-list-group v-if="isThereProductsOnCart">
      <b-list-group-item
        v-for="item in getPriceByGroupedProducts"
        :key="item.id"
        class="border-top-0 border-left-0 border-right-0"
      >
        <b-row v-for="detail in Object.values(item)" :key="detail.id">
          <b-col v-if="detail.quantity > 0" md="8" class="d-flex flex-column justify-content-center">
            <h5 class="font-weight-bolder h6">
              <span class="text-dark mr-2">Producto:</span>
              <span class="text-purple">{{ detail.product.name }}</span>
            </h5>
            <p class="mb-0 text-primary text-muted font-italic small h-50 overflow-auto">
              {{ detail.product.description }}
            </p>
          </b-col>
          <b-col v-if="detail.quantity > 0" md="4" class="d-flex flex-column justify-content-center">
            <p class="text-gray mb-1 font-weight-bold">Precio unitario: {{ $formatNumber(detail.price) }}</p>
            <p class="text-gray mb-1 font-weight-bold">Unidades: {{ detail.quantity }}</p>
            <p class="text-gray mb-1 font-weight-bold">Subtotal: {{ $formatNumber(detail.subtotal) }}</p>
            <XInputGroupProductAdd
              :item="detail.product"
              :initial-items-value="detail.quantity"
              @on-added="onUpdatedItem"
            />
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
    <b-container v-else class="my-10">
      <h2 class="text-center text-muted">No hay productos agregados al carrito</h2>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',

  components: {
    XInputGroupProductAdd: () => import('@/components/Shared/XInputGroupProductAdd')
  },

  computed: mapGetters('productModule', ['getPriceByGroupedProducts', 'isThereProductsOnCart']),

  methods: {
    onUpdatedItem (item) {
      this.$notify({ error: false, message: `Producto '${item.product.name}' actualizado` }, 'Carrito actualizado', {
        status: 'warning'
      })
    }
  }
}
</script>
