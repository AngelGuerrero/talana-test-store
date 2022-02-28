<template>
  <b-modal
    v-model="l_value"
    v-bind="$attrs"
    v-on="$listeners"
    :size="$attrs['size'] || 'sm'"
    :ok-only="$attrs['ok-only'] || true"
    :centered="$attrs['centered'] || true"
    :ok-title="$attrs['ok-title'] || 'Cerrar'"
    :scrollable="$attrs['scrollable'] || true"
    :button-size="$attrs['button-size'] || 'sm'"
    :ok-variant="$attrs['ok-variant'] || 'danger'"
    :header-class="$attrs['header-class'] || 'px-2'"
    :no-close-on-esc="$attrs['no-close-on-esc'] || true"
    :no-close-on-backdrop="$attrs['no-close-on-backdrop'] || true"
    content-class="x-modal-md"
  >
    <template #modal-header>
      <b-row class="w-100 m-0 p-0">
        <b-col cols="12" sm="6" class="pb-3 pb-md-0">
          <span class="text-primary font-weight-bold">{{ $attrs.title }}</span>
        </b-col>
        <b-col cols="12" sm="6" v-if="withFilter">
          <b-form-group class="mb-0">
            <b-input-group size="sm">
              <b-form-input v-model="filter" type="search" placeholder="Filtrar" />
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = null">
                  Limpiar
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
    </template>

    <slot name="header"></slot>

    <slot />

    <template #modal-footer="{ close }">
      <slot name="modal-footer" v-bind:close="close"></slot>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'XModal',

  props: {
    value: {},

    withFilter: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      l_value: this.value,

      filter: null
    }
  },

  watch: {
    value (val) {
      this.l_value = val
    },
    l_value (val) {
      this.$emit('input', val)
    }
  }
}
</script>
