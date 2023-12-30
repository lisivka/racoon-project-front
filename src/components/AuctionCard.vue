<template>
  <v-card class="card-hover pa-2 px-4">
    <div class="d-flex justify-space-between h-100">
      <div class="align-self-center w-100">
        <BaseLink
            :to="`/auctions/${auction.id}`"
            :text="auction.lot"
        />
        <CardInfoLine
            label="Status"
            :value="auction.status"
            class="py-2"
        />
        <CardInfoLine
            label="Start date"
            :value="auction.start_date"
            class="py-2"
        />
        <CardInfoLine
            label="End date"
            :value="auction.end_date"
            class="py-2"
        />
      </div>
    </div>
  </v-card>
</template>

<script>
import BaseLink from '@/components/BaseLink';
import CardInfoLine from '@/components/CardInfoLine';

export default {
  name: 'UserCard',
  components: {
    BaseLink,
    CardInfoLine,
  },
  props: {
    auction: Object,
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
