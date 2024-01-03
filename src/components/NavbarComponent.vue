<template>
  <div class="header">
    <v-container class="header-container pa-0">
      <v-toolbar
        color="transparent"
        title="AUCTIONS"
      >

        <v-toolbar-items>
          <v-btn @click="$router.push('/')">
            Home
          </v-btn>
          <v-btn @click="$router.push('/lots')">
            Lots
          </v-btn>

          <template v-if="isAuthorized">
            <v-btn
                v-for="(item, i) in HEADER_NAVBAR_AUTHORIZED_USER"
                :key="i"
                @click="$router.push(`${item.path}`)"
            >
              {{ item.title }}
            </v-btn>
          </template>

          <v-btn @click="$router.push('/about')">
            About
          </v-btn>
        </v-toolbar-items>

        <v-card
          v-if="userEmail || userName"
          class="elevation-0 text-center user-title mx-5 transparent"
        >
          <p>{{ userEmail }}</p>
          <p>{{ userName }}</p>
        </v-card>

        <v-card class="elevation-0 transparent">
          <v-card-title>
            <v-menu>

              <template v-slot:activator="{ props }">
                <v-app-bar-nav-icon v-bind="props"/>
              </template>

              <v-list class="dropdown-menu-container">
                <template v-if="!isAuthorized">
                  <v-btn
                    v-for="(item, i) in HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER"
                    :key="i"
                    @click="$router.push(item.path)"
                    class="elevation-0 w-100"
                  >
                    {{ item.title }}
                  </v-btn>
                </template>

                <template v-if="isAuthorized">
                  <v-btn
                      v-for="(item, i) in HEADER_DROPDOWN_MENU_AUTHORIZED_USER"
                      :key="i"
                      @click="$router.push(item.path)"
                      class="elevation-0 w-100"
                  >
                    {{ item.title }}
                  </v-btn>
                </template>

                <v-btn
                  v-if="isAuthorized"
                  @click="myProfile"
                  class="elevation-0 w-100"
                >
                  My profile
                </v-btn>
                <v-btn
                  v-if="isAuthorized"
                  @click="logout"
                  class="elevation-0 w-100"
                >
                  Logout
                </v-btn>
              </v-list>

            </v-menu>
          </v-card-title>
        </v-card>

      </v-toolbar>
    </v-container>
  </div>

  <v-container class="main pv-0">
    <Suspense>
      <router-view/>
    </Suspense>
  </v-container>

</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { auth } from '@/utils';
import {
  HEADER_NAVBAR_AUTHORIZED_USER,
  HEADER_DROPDOWN_MENU_AUTHORIZED_USER,
  HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER,
} from '@/constants';

export default {
  name: 'NavbarComponent',
  setup() {
    const store = useStore();
    const router = useRouter();
    const isAuthorized = computed(() => store.getters['authUser/isAuthorized']);
    const authUserId = computed(() => store.getters['authUser/getUserId']);
    const userName = computed(() => store.getters['authUser/getUserName']);
    const userEmail = computed(() => store.getters['authUser/getUserEmail']);

    const logout = () => {
      auth.logoutUser();
      router.push('/');
    };

    const myProfile = () => router.push(`/users/${authUserId.value}`);

    return {
      HEADER_NAVBAR_AUTHORIZED_USER,
      HEADER_DROPDOWN_MENU_AUTHORIZED_USER,
      HEADER_DROPDOWN_MENU_NON_AUTHORIZED_USER,
      userName,
      userEmail,
      isAuthorized,
      authUserId,
      logout,
      myProfile,
    };
  }
};
</script>

<style scoped>
.header {
  background-color: rgba(168, 165, 165, 0.35);
  width: 100%;
}
.header-container {
  min-width: 480px;
  max-width: 1200px;
  width: 100%;
}
.main {
  min-width: 480px;
  max-width: 1200px;
  text-align: center;
}
.user-title {
  font-size: 12px;
}
.transparent {
  background-color: transparent;
}
.dropdown-menu-container {
  display: flex;
  flex-direction: column;
}
</style>
