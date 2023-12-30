<template>
  <v-sheet
      width="350"
      class="mx-auto mt-15"
  >
    <v-form @submit.prevent="submitUserLoginForm">
      <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="VALIDATION_RULES.email"
      />

      <v-text-field
          v-model="formData.password"
          label="Password"
          :rules="VALIDATION_RULES.password"
          type="password"
      />

      <div style="position: relative">
        <p class="login-error">
          {{ errors.detail }}
        </p>
      </div>

      <BaseButton
          type="submit"
          class="mt-5 w-100"
          button-name="Login"
      />
    </v-form>
    <p class="mt-4">
      <BaseLink
          to="/auth/users/reset/password"
          text="Forgot your password?"
      />
    </p>
  </v-sheet>
</template>

<script>
  import {useStore} from 'vuex';
  import {useRouter} from 'vue-router';
  import {ref} from 'vue';
  import {authUserApi, usersApi} from '@/api';
  import {auth, formUtils, objUtils} from '@/utils';
  import {VALIDATION_RULES} from '@/constants';
  import BaseButton from '@/components/BaseButton';
  import BaseLink from '@/components/BaseLink';

  export default {
    name: 'UserAuthorizationPage',
    components: {
      BaseButton,
      BaseLink,
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const formData = ref({
        email: '',
        password: '',
      });
      const errors = ref({detail: ''});

      const submitUserLoginForm = async () => {
        errors.value = objUtils.createEmptyObject(errors.value);

        const isFormValid = formUtils.formValidator(formData, ref(VALIDATION_RULES));
        if (!isFormValid) {
          return;
        }

        try {
          const response = await authUserApi.jwtCreate(formData.value);
          auth.setTokens(response.data);

          const {data} = await usersApi.getMyUser();
          store.commit('authUser/setUserData', data);

          router.push(`/users/${data.id}`);
        } catch (err) {
          errors.value = objUtils.mergeObjects(errors.value, err.response.data);
        }
      };

      return {
        VALIDATION_RULES,
        formData,
        errors,
        submitUserLoginForm,
      };
    },
  };
</script>

<style>
  .login-error {
    width: 100%;
    color: #b02828;
    font-size: 0.75rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0%);
  }
</style>
