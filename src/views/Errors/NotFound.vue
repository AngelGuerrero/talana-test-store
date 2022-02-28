<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="text-center mt-4">
          <img class="img-fluid p-4" src="@/assets/img/illustrations/404-error-with-a-cute-animal.svg" alt="" />
          <p class="lead">La URL ingresada no existe.</p>
          <router-link :to="{ name: 'Dashboard' }" class="text-arrow-icon">
            <i class="ml-0 mr-1" data-feather="arrow-left"></i>
            Regresar al Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
