<template>
  <div>
    <!-- Overlap -->
    <header v-if="headerType === 'overlap'" class="page-header page-header-dark pb-10" :class="background">
      <div class="container">
        <div class="page-header-content pt-4">
          <div class="row align-items-center justify-content-between">
            <div class="col-auto mt-4">
              <h1 class="page-header-title">
                <div class="page-header-icon">
                  <b-icon icon="shop" />
                </div>
                {{ title }}
              </h1>
              <div class="page-header-subtitle text-white">{{ description }}</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Compact -->
    <header
      v-if="headerType === 'compact'"
      class="page-header page-header-compact page-header-light border-bottom bg-white mb-4"
    >
      <div class="container-fluid">
        <div class="page-header-content">
          <div class="row align-items-center justify-content-between pt-3">
            <div class="col-12 col-md-6 mb-3">
              <h1 class="page-header-title">
                <div class="page-header-icon"></div>
                {{ title }}
              </h1>
            </div>

            <div class="col-12 col-md-6 mb-3">
              <slot name="right-place"></slot>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Simplified -->
    <header v-if="headerType === 'simplified'" class="page-header page-header-dark mb-4" :class="background">
      <div class="container-fluid">
        <div class="page-header-content pt-4">
          <div class="row align-items-center justify-content-between">
            <div class="col-auto mt-4">
              <h1 class="page-header-title">
                <div class="page-header-icon"></div>
                {{ title }}
              </h1>
              <div class="page-header-subtitle">
                {{ description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderType',

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
      default: 'bg-gradient-primary-to-secondary',
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
  }
}
</script>
