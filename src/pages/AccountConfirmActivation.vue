<template>
  <template v-if="!activation">
    <p>Your account has not been activated. Try again.</p>
  </template>
  <template v-else>
    <p>Your account is activated!</p>
    <p>
      <BaseLink
          to="/authorization"
          text="Click here to login."
      />
    </p>
  </template>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { authUserApi } from '@/api';
import BaseLink from '@/components/BaseLink';

export default {
  name: 'ConfirmActivationAccount',
  components: {
    BaseLink,
  },
  setup() {
    const activation = ref(false);
    const router = useRouter();
    const { uid, token } = router.currentRoute.value.params;
    const formData = {
      uid,
      token,
    };

    const sendActivationRequest = async () => {
      const { status } = await authUserApi.activationUserAccount(formData);
      activation.value = status === 204;
    };

    onMounted(async () => await sendActivationRequest());

    return { activation }
  },
};
</script>
