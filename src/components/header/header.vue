<template>
  <div>
    Header
  </div>

  <div class="main pv-0">
    <Suspense>
      <router-view/>
    </Suspense>
  </div>
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style lang="scss" scoped>

</style>
