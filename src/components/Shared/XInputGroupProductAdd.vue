<template>
  <form @submit.prevent="onSubmit">
    <div v-show="response.message" class="w-100 text-sm text-center my-3">
      <span :class="response.error ? 'text-danger' : 'text-success'">{{ response.message }}</span>
    </div>

    <div>
      <b-input-group size="sm">
        <template #prepend>
          <b-button variant="black" @click="onMinus"><i class="fa-solid fas fa-minus"></i></b-button>
        </template>

        <b-input v-model="counter" placeholder="0" class="form-control" readonly />

        <template #append>
          <b-button variant="success" size="sm" @click="onPlus" class="py-0">
            <i class="fa-solid fas fa-plus"></i>
          </b-button>

          <b-button type="submit">
            <i class="fa-solid fas fa-cart-plus"></i>
          </b-button>
        </template>
      </b-input-group>
    </div>
  </form>
</template>

<script>
export default {
  name: 'XInputGroupProductAdd',

  props: {
    item: {
      type: Object,
      required: true
    },
    initialItemsValue: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      counter: 0,
      response: {
        error: true,
        message: ''
      }
    }
  },

  computed: {
    hasInitialCounter () {
      return this.initialItemsValue !== null && this.initialItemsValue !== undefined
    }
  },

  watch: {
    counter (newVal) {
      this.response.message = newVal >= 20 ? 'Por el momento no podemos agregar más de 20 productos a la compra' : ''
    },

    initialItemsValue: {
      immediate: true,
      handler (newVal) {
        if (!this.hasInitialCounter) return

        this.counter = newVal
      }
    }
  },

  methods: {
    onSubmit () {
      if (this.counter <= 0) return

      let newCounter = this.counter

      if (this.hasInitialCounter) {
        newCounter = this.counter - this.initialItemsValue
      }

      const data = { product: this.item, quantity: newCounter }

      for (let i = 0; i < newCounter; i++) {
        this.$store.commit('productModule/setProductToCart', data)
      }
      this.$emit('on-submit', data)
      this.$emit('on-added', data)
    },

    onMinus () {
      if (this.hasInitialCounter) {
        this.$store.commit('productModule/removeProductFromCart', this.item)
        return
      }

      this.counter = this.counter <= 0 ? 0 : this.counter - 1
    },

    onPlus () {
      this.counter = this.counter >= 20 ? 20 : this.counter + 1
    }
  }
}
</script>
