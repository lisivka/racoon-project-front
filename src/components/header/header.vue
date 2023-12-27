<template>
  <div class="heder">
    <router-link to="/">
      <p class="heder__logo">LOGO</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style lang="scss" scoped>
.heder {
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: blue;
  &__logo {
    width: 100px;
    padding: 10px;
    color: red;
    background-color: aqua;
    border-radius: 10px;
  }
}
</style>
