<template>
  <div class="mt-15">
    <h1 class="display-1">404</h1>
    <h2 class="display-4">Page Not Found</h2>
    <p class="subheading-1 mt-5">not Found</p>
    <BaseLink to="/" text="go home"/>
  </div>
</template>

<script>
  import BaseLink from '@/components/BaseLink';

  export default {
    name: 'NotFoundPage',
    components: {
      BaseLink,
    },
  };
</script>
