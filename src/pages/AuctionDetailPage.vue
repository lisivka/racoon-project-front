<template>
  <v-card>
    <h1 class="mb-5">
      Auction detail
    </h1>

    <v-container class="d-flex">
      <div class="text-user-info">
        <v-card className="text-left elevation-0">
          <InfoLine
              label="Lot"
              :value="auctionData.lot"
          />
          <InfoLine
              label="Status"
              :value="auctionData.status"
          />
          <InfoLine
              label="Start date"
              :value="auctionData.start_date"
          />
          <InfoLine
              label="End date"
              :value="auctionData.end_date"
          />
        </v-card>
      </div>
    </v-container>
    <div class="bid-container">
      <h2>Bids</h2>

      <div class="bid-form-container w-50 mx-auto my-5">
        <v-col cols="8" md="8">
          <v-text-field
              v-model.number="newBet"
              label="Enter your bid"
              type="number"
              :error-messages="error"
          />
        </v-col>

        <v-btn
            @click="sendBid"
            :disabled="newBet <= 0"
            cols="4" md="4"
            class="ml-5"
        >
          Send Bid
        </v-btn>
      </div>

      <h3 v-if="bidsData && bidsData.length > 0">Current lot price: {{ bidsData[0].bet }}$</h3>
      <h3 v-else>No one has placed a bid at the moment</h3>

      <ul class="my-10">
        <li
            v-for="(bid, index) in bidsData"
            :key="index"
        >
          <div class="bid-item py-2">
            <div class="avatar-container">
              <img
                  :src="`${BASE_URL}${bid.user.profile.avatar}`"
                  alt="User Avatar"
                  class="avatar"
              />
            </div>
            <div>
              <p>{{ `${bid.user.email} (${bid.user.profile.name} ${bid.user.profile.surname}): ${bid.bet}$` }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script>
  import {ref, onMounted, watch, onBeforeUnmount} from 'vue';
  import {useRouter} from 'vue-router';
  import {auctionsApi} from '@/api';
  import {BASE_URL, BASE_WS_URL, NAME_ACCESS_TOKEN} from '@/constants';
  import InfoLine from '@/components/InfoLine';

  export default {
    name: 'AuctionDetailPage',
    components: {
      InfoLine,
    },
    setup() {
      const router = useRouter();
      const auctionData = ref({});
      const bidsData = ref([]);
      const newBet = ref(0);
      const auctionSocket = ref(null);
      const error = ref('');


      const getAuctionData = async (auctionId) => {
        try {
          const {data} = await auctionsApi.getAuction(auctionId);
          return data;
        } catch (err) {
          console.error(err);
        }
      };

      const sendBid = () => {
        error.value = '';
        auctionSocket.value.send(JSON.stringify({bidCreate: true, bet: newBet.value}));
        newBet.value = 0;
      }

      onMounted(async () => {
        const {id} = router.currentRoute.value.params;
        auctionData.value = await getAuctionData(id);

        auctionSocket.value = new WebSocket(`${BASE_WS_URL}/ws/auctions/${id}/`);

        auctionSocket.value.onopen = () => {
          const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN);
          auctionSocket.value.send(JSON.stringify({accessToken}));
        }

        auctionSocket.value.onmessage = (event) => {
          const data = JSON.parse(event.data);

          if (data?.bids) {
            bidsData.value = data.bids;
          } else if (data?.create) {
            bidsData.value = [data, ...bidsData.value];
          } else {
            error.value = data?.error;
            console.error(`Error: ${data?.error}`);
          }
        }

        auctionSocket.value.onclose = (event) => {
          if (!event.wasClean) {
            console.error(`Connection abort code: ${event.code}. Reason for connection loss: ${event.reason}`);
          }
        };
      });

      watch(() => router.currentRoute.value.params.id, async (newId) => {
        auctionData.value = await getAuctionData(newId);
      });

      onBeforeUnmount(() => {
        if (auctionSocket.value) {
          auctionSocket.value.close();
        }
      });

      return {
        auctionData,
        bidsData,
        newBet,
        error,
        BASE_URL,
        sendBid,
      }
    }
  };
</script>

<style scoped>
  .text-user-info {
    padding-left: 30px;
  }

  .bid-container {
    margin: 50px auto;
  }

  .bid-form-container {
    display: flex;
    align-items: center;
  }

  .bid-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-container {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    margin-right: 10px;
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
</style>
