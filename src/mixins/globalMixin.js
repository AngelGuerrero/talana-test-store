import numbro from 'numbro'
import moment from 'moment'

export default {
  mounted () {
    moment.locale('es')
  },

  methods: {
    $notify (getval = {}, title, attr = {}) {
      const obj = {}
      obj.icon = attr.icon || 'exclamation-triangle'
      obj.delay = attr.delay || 10000
      obj.title = title
      obj.toaster = attr.toaster || 'b-toaster-bottom-left'
      obj.closeable = !attr.closeable || true
      obj.closeOnTimeout = !attr.closeOnTimeout || true
      //
      obj.status = attr.status || getval.error ? 'danger' : 'success' || 'danger'
      obj.message = getval.message || 'Ha ocurrido un error, intente de nuevo más tarde'

      const payload = { ...obj, ...attr }

      const h = this.$createElement

      //
      // HEADER
      const vNodesHeader = h(
        'div',
        {
          class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2']
        },
        [
          //
          // Icono
          h('b-icon', {
            class: 'mr-2',
            props: {
              icon: payload.icon
            }
          }),
          //
          // Título
          h('strong', { class: 'mr-2' }, payload.title),
          //
          // Tiempo de espera del toast notification
          h(
            'small',
            {
              class: 'ml-auto text-italics text-dark'
            },
            this.$formatForHumans(new Date())
          )
        ]
      )

      //
      // BODY
      const vNodesMsg = h(
        'p',
        { class: ['text-center', 'mb-0'] },
        //
        // Mensaje
        [h('strong', payload.message)]
      )

      //
      // Instancia el notification toast
      this.$bvToast.toast([vNodesMsg], {
        bodyClass: 'bg-white text-black',
        title: [vNodesHeader],
        solid: true,
        variant: payload.status,
        noAutoHide: !payload.closeOnTimeout,
        noCloseButton: !payload.closeable,
        autoHideDelay: payload.delay,
        toaster: payload.toaster,
        appendToast: true
      })

      return true
    },

    $delay (ms) {
      return new Promise(resolve => setTimeout(_ => resolve(), ms))
    },

    $formatNumber (value) {
      if (!value) return `${numbro(0).formatCurrency({ thousandSeparated: true })}`

      return `${numbro(value).formatCurrency({ thousandSeparated: true })}`
    },

    $formatForHumans (value) {
      return moment(value, 'YYYY-MM-DD hh:mm:ss').fromNow()
    }
  }
}
