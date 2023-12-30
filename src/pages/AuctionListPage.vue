<template>
  <CardList
      title="Auctions"
      :data="auctions"
  >
    <template v-slot:default="{ item }">
      <AuctionCard :auction="item"/>
    </template>
  </CardList>
  <PaginationComponent
      :totalPages="totalPages"
      :updatePage="handlePageChange"
  />
</template>

<script>
  import { onMounted, ref } from 'vue';
  import { auctionsApi } from '@/api';
  import CardList from '@/components/CardList';
  import AuctionCard from '@/components/AuctionCard';
  import PaginationComponent from '@/components/PaginationComponent';

  export default {
    name: 'AuctionListPage',
    components: {
      CardList,
      AuctionCard,
      PaginationComponent,
    },
    props: {
      tab: {
        type: String,
        require: false,
      },
    },
    setup() {
      const auctions = ref([]);
      const totalPages = ref(1);

      const getAuctions = async (page) => {
        try {
          const {
            data: {
              total_pages,
              results,
            },
          } = await auctionsApi.getAuctionList(page);
          totalPages.value = total_pages;
          return results;
        } catch (err) {
          console.error(err);
        }
      };

      const handlePageChange = async (newPage) => {
        auctions.value = await getAuctions(newPage);
      };

      onMounted(async () => {
        auctions.value = await getAuctions(1);
      });

      return { auctions, totalPages, handlePageChange }
    },
  };
</script>
