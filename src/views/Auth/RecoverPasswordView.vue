<template>
  <base-auth-view>
    <portal-target name="notificationNominasAlertPlace" />

    <FormulateForm v-if="!emailSent" @submit="submit" #default="{ isLoading, isValid }">
      <h1 class="text-center">Recuperar contraseña</h1>
      <FormulateErrors />

      <!--(email address)-->
      <FormulateInput
        v-model="email"
        name="email"
        label="Email"
        placeholder="Ingresa la dirección de correo"
        validation="bail|required|email"
        :validation-messages="{
          required: 'El email es requerido',
          email: 'Ingresa un email válido'
        }"
      />

      <!--(Recover button)-->
      <FormulateInput
        type="submit"
        input-class="btn btn-primary btn-block"
        :disabled="isLoading || !isValid"
        :label="isLoading ? 'Validando...' : 'Recuperar'"
      />

      <!--(Login link)-->
      <div class="my-2 w-100 text-right">
        <router-link class="small" :to="{ name: 'Login' }">
          Iniciar sesión
        </router-link>
      </div>
    </FormulateForm>

    <!-- Enlace para regresar e iniciar sesión -->
    <router-link v-if="emailSent" class="small" :to="{ name: 'Login' }">
      <b-button variant="primary" class="btn-block">
        Iniciar sesión
      </b-button>
    </router-link>
  </base-auth-view>
</template>

<script>
import BaseAuthView from '@/views/Layouts/BaseAuthView'

export default {
  name: 'RecoverPasswordView',

  components: {
    BaseAuthView
  },

  data () {
    return {
      email: '',
      emailSent: false
    }
  },

  methods: {
    async submit ({ email }) {
      const getval = await this.$store.dispatch('authModule/recoverPassword', email)

      this.$alert(getval, 'Recuperación de contraseña', 'notificationNominasAlertPlace', {
        status: getval.error ? 'danger' : 'success',
        closeable: false
      })

      this.emailSent = !getval.error
    }
  }
}
</script>
