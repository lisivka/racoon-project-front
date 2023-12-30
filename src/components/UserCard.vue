<template>
  <v-card class="card-hover pa-2 px-4">
    <div class="d-flex justify-space-between h-100">
      <v-avatar
          class="align-self-center mx-3 my-1"
          size="70"
      >
        <v-img
            :src="`${BASE_URL}${user.profile.avatar}`"
            :cover="true"
        />
      </v-avatar>
      <div class="align-self-center w-100">
        <BaseLink
            :to="`/users/${user.id}`"
            :text="`${user.profile.name} ${user.profile.surname}`"
        />
        <CardInfoLine
            label="Email"
            :value="user.email"
            class="py-2"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import { BASE_URL } from '@/constants';
import BaseLink from '@/components/BaseLink';
import CardInfoLine from '@/components/CardInfoLine';

export default {
  name: 'UserCard',
  components: {
    BaseLink,
    CardInfoLine,
  },
  props: {
    user: Object,
  },
  setup() {
    return {
      BASE_URL,
    };
  },
}
</script>

<style scoped>
.card-hover {
  min-width: 480px;
  min-height: 100px;
}
.card-hover:hover {
  transform: scale(1.03);
  transition: transform 0.2s ease-in-out;
}
</style>
