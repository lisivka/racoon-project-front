<template>
  <v-card>
    <h1 class="mb-5">
      {{ myProfile ? 'My profile' : 'User profile' }}
    </h1>

    <v-container class="d-flex">
      <v-img
          :src="`${BASE_URL}${userData.profile?.avatar}`"
          class="avatar"
      />
      <div class="text-user-info">
        <v-card className="text-left elevation-0">
          <InfoLine
              v-for="(field, i) in infoFields"
              :key="`${i}_${field.name}`"
              :label="field.label"
              :value="userData.profile?.[field.name] || userData?.[field.name] || '-'"
          />
        </v-card>
      </div>
    </v-container>
  </v-card>
</template>

<script>
  import {ref, computed, onMounted, watch} from 'vue';
  import {useRouter} from 'vue-router';
  import {useStore} from 'vuex';
  import {usersApi} from '@/api';
  import {BASE_URL, MY_USER_INFO_FIELDS, USER_INFO_FIELDS} from '@/constants';
  import InfoLine from '@/components/InfoLine';

  export default {
    name: 'UserProfilePage',
    components: {
      InfoLine,
    },
    setup() {
      const router = useRouter();
      const store = useStore();
      const myProfile = ref(false);
      const userData = ref({});
      const infoFields = ref([]);
      const authUserId = computed(() => store.getters['authUser/getUserId']);

      const getUserData = async (userId) => {
        try {
          const {data} = await usersApi.getUserProfile(userId);
          return data;
        } catch (err) {
          console.error(err);
        }
      };

      const getUsers = async (userId) => {
        myProfile.value = parseInt(userId) === authUserId.value;
        if (userId && myProfile.value) {
          infoFields.value = MY_USER_INFO_FIELDS;
          userData.value = store.state.authUser.user;
        } else if (userId) {
          infoFields.value = USER_INFO_FIELDS;
          userData.value = await getUserData(userId);
        }
      };

      onMounted(async () => {
        const {id} = router.currentRoute.value.params;
        await getUsers(id);
      });

      watch(() => router.currentRoute.value.params.id, async (newId) => {
        await getUsers(newId);
      });

      return {
        myProfile,
        userData,
        infoFields,
        BASE_URL,
      }
    }
  };
</script>

<style scoped>
  .avatar {
    min-width: 120px;
    max-width: 200px;
    max-height: 200px;
    width: auto;
    height: auto;
    border-radius: 20px;
    object-fit: cover;
  }

  .text-user-info {
    padding-left: 30px;
  }
</style>
