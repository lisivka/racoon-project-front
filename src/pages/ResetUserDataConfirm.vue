<template>
  <template v-if="!confirmResetProperty">
    <v-sheet
        width="350"
        class="mx-auto mt-15"
    >
      <v-form @submit.prevent="submitUserResetPropertyForm">
        <template v-if="property === 'password'">
          <v-text-field
            v-model="passwordFormData.new_password"
            label="Password"
            :rules="validationRules.new_password"
            type="password"
          />

          <v-text-field
            v-model="passwordFormData.re_new_password"
            label="Confirm password"
            :rules="validationRules.re_new_password"
            type="password"
          />
        </template>
        <template v-else>
          <v-text-field
            v-model="usernameFormData.new_username"
            label="Username"
            :rules="validationRules.new_username"
          />
        </template>
        <div style="position: relative" >
          <p class="login-error">
            {{ errors.detail }}
          </p>
        </div>

        <BaseButton
          :button-name="`Apply new ${property}`"
          class="mt-5 submit-button w-100"
          type="submit"
        />
      </v-form>
    </v-sheet>
  </template>
  <template v-else>
    <p>
      {{ `${property} has been changed.` }}
    </p>
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
import { ref } from 'vue';
import { authUserApi } from '@/api';
import { formUtils, objUtils } from '@/utils';
import { VALIDATION_RULES } from '@/constants';
import BaseLink from '@/components/BaseLink';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'ConfirmActivationAccount',
  components: {
    BaseLink,
    BaseButton,
  },
  setup() {
    const confirmResetProperty = ref(false);
    const router = useRouter();
    const { property, uid, token } = router.currentRoute.value.params;
    const formData = ref({
      uid,
      token,
    });
    const passwordFormData = ref({
      new_password: '',
      re_new_password: '',
    });
    const usernameFormData = ref({ new_username: '' });
    const errors = ref({ detail: '' });

    const validationRules = ref({
      ...VALIDATION_RULES,
      re_new_password: [
        v => !!v || 'Password is required',
        v => v === passwordFormData.value.new_password || 'Passwords must match'
      ]
    })

    const submitUserResetPropertyForm = async () => {
      errors.value = objUtils.createEmptyObject(errors.value);

      const propertyFormData = property === 'password'
          ? passwordFormData
          : usernameFormData
      const isFormValid = formUtils.formValidator(propertyFormData, validationRules);
      if (!isFormValid) {
        return;
      }

      try {
        const newFormData = { ...formData.value, ...propertyFormData.value };
        const { status } = await authUserApi.resetUserDataConfirm(newFormData, property);
        confirmResetProperty.value = status === 204;
      } catch (err) {
        const data = err.response.data;
        errors.value.detail = data.new_password && data.new_password[0] || data.new_username[0];
      }
    };

    return {
      property,
      confirmResetProperty,
      validationRules,
      passwordFormData,
      usernameFormData,
      errors,
      submitUserResetPropertyForm,
    }
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
