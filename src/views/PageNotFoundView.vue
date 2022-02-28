<template>
  <div id="layoutError">
    <div id="layoutError_content">
      <main>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="text-center mt-4">
                <img
                  class="img-fluid p-4"
                  src="@/assets/img/illustrations/404-error-with-a-cute-animal.svg"
                  alt=""
                />
                <p class="lead">
                  No se encontró la URL solicitada
                </p>
                <router-link
                  class="text-arrow-icon"
                  :to="{ name: 'Dashboard' }"
                >
                  <i class="ml-0 mr-1" data-feather="arrow-left"></i>
                  Regresar al inicio
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFoundView'
}
</script>
