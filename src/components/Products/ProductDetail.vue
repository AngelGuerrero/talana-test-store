<template>
  <div class="my-cursor">
    <div v-if="!showDescription" class="card lift h-100" style="min-height: 20rem; max-height: 25rem;">
      <div class="card-header d-flex justify-content-between">
        <h6>{{ product.name }}</h6>
        <div v-show="showDetails">
          <b-button size="sm" @click="showDescription = !showDescription">Leer descripción</b-button>
        </div>
      </div>

      <div class="card-body d-flex justify-content-center flex-column">
        <div class="d-flex align-items-center justify-content-between">
          <div class="mr-3">
            <img :src="getIcon" style="max-width: 2.5rem; max-height: 2.5rem;" class="rounded-circle mb-2" />
            <div class="text-muted small">
              <p>{{ product.abstract }}</p>
            </div>

            <div v-show="showDetails" class="text-muted small">
              Código de producto:
              <b-badge size="sm">{{ product.code }}</b-badge>
            </div>
          </div>
          <img :src="product.photo" style="max-width: 6rem; max-height: 7rem;" />
        </div>
      </div>
      <div class="card-body bg-purple-soft" style="max-height: 4rem;">
        <div class="mr-3 d-flex justify-content-between">
          <div class="small font-weight-bold">
            <h4>
              Precio:
              <b-badge variant="success">{{ $formatNumber(product.price) }}</b-badge>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDescription" class="card my-2">
      <div class="card-header d-flex justify-content-between">
        <h6>{{ product.name }}</h6>
        <b-button size="sm" @click="showDescription = !showDescription">Volver</b-button>
      </div>
      <div class="card-body">
        <div class="mr-3">
          <div class="small font-weight-bold">
            <p class="text-sm">
              {{ product.description }}
            </p>
          </div>
        </div>
        <div>
          <img :src="getIcon" style="max-width: 2.5rem; max-height: 2.5rem;" class="rounded-circle mb-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',

  props: {
    product: {
      type: Object,
      default: () => ({})
    },

    showDetails: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      showDescription: false
    }
  },

  computed: {
    getIcon () {
      return this.product.attributes[0].icon || 'https://via.placeholder.com/150'
    }
  }
}
</script>
