<template>
  <base-auth-view>
    <FormulateForm @submit="submit" #default="{ isLoading, isValid }">
      <h1 class="text-center">Iniciar sesión</h1>
      <FormulateErrors />

      <!--(email address)-->
      <FormulateInput
        v-model="formValues.email"
        name="email"
        label="Email"
        placeholder="Ingresa la dirección de correo"
        validation="bail|required|email"
        :validation-messages="{
          required: 'El email es requerido',
          email: 'Ingresa un email válido'
        }"
      />

      <!--(password)-->
      <FormulateInput
        v-model="formValues.password"
        name="password"
        label="Contraseña"
        type="password"
        placeholder="Ingresa tu contraseña"
        validation="bail|required"
        :validation-messages="{
          required: 'La contraseña es requerida'
        }"
      />

      <!--(Login button)-->
      <FormulateInput
        type="submit"
        input-class="btn btn-primary btn-block"
        :disabled="isLoading || !isValid"
        :label="isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'"
      />

      <!--(Remember password)-->
      <div class="my-2 text-right">
        <router-link class="small" :to="{ name: 'RecoverPassword' }">
          Recuperar contraseña
        </router-link>
      </div>

      <hr />

      <button
        :disabled="isGoogleAuthenticating"
        type="button"
        class="mt-1 btn btn-google btn-block"
        @click="AuthProvider('google')"
      >
        <i class="fab fa-google"></i>
        {{ isGoogleAuthenticating ? 'Espere...' : 'Acceder con Google' }}
      </button>
    </FormulateForm>
  </base-auth-view>
</template>

<script>
import BaseAuthView from '@/views/Layouts/BaseAuthView'

export default {
  name: 'LoginView',

  components: {
    BaseAuthView
  },

  data () {
    return {
      formValues: {
        email: null,
        password: null
      },

      isGoogleAuthenticating: false
    }
  },

  methods: {
    async submit (data) {
      const getval = await this.$store.dispatch('authModule/login', data)
      this.$notify(getval, 'Inicio de sesión', {
        status: getval.error ? 'danger' : 'success'
      })

      if (getval.error) return

      this.$router.push({ name: 'Dashboard' }).catch(_ => ({}))
    },

    AuthProvider (provider) {
      this.isGoogleAuthenticating = true
      this.$auth
        .authenticate(provider)
        .then(async response => {
          const getval = await this.$store.dispatch('authModule/loginWithGoogle', {
            provider,
            response
          })

          this.$notify(getval, 'Inicio de sesión', { status: getval.error ? 'danger' : 'success' })

          this.isGoogleAuthenticating = false

          if (getval.error) return

          this.$router.push({ name: 'Dashboard' }).catch(_ => ({}))
        })
        .catch(err => {
          this.$notify({ error: true, message: err.response.data.message }, 'Inicio de sesión', {
            status: 'danger'
          })

          this.isGoogleAuthenticating = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-google {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.btn.btn-google .fa-google {
  margin-right: 8px;
}
</style>
