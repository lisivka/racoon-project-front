<template>
  <v-sheet
      width="400"
      class="mx-auto mt-15"
  >
    <template v-if="!registration.done">
      <v-form @submit.prevent="submitUserRegistrationForm">
        <v-file-input
          v-model="formData.avatar"
          label="Avatar"
          :rules="validationRules.avatar"
          :error-messages="errors.avatar"
          prepend-icon="mdi-camera"
          show-size
          accept=".png, .jpeg, .jpg"
        />
        <v-text-field
          v-for="(value, key) in FIELDS_FORM_REGISTRATION"
          :key="key"
          v-model="formData[value.model]"
          :label="value.label"
          :rules="validationRules[key]"
          :error-messages="errors[value.model]"
          :type="value.type"
        />
        <BaseButton
          type="submit"
          class="w-100"
          button-name="Registration"
        />
      </v-form>
    </template>
    <template v-else>
      <p>To activate your account, you should receive an email.</p>
      <p>
        After confirmation of activation
        <BaseLink
          to="/authorization"
          text="Click here to login."
        />
      </p>
    </template>
  </v-sheet>
</template>

<script>
import { ref } from 'vue';
import { formUtils } from '@/utils';
import { authUserApi } from '@/api';
import { objUtils } from '@/utils';
import { FIELDS_FORM_REGISTRATION, VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';
import BaseLink from '@/components/BaseLink';

export default {
  name: 'UserRegistrationPage',
  components: {
    BaseButton,
    BaseLink,
  },
  setup() {
    const registration = ref({ done: false });
    const formData = ref({
      avatar: null,
      name: '',
      surname: '',
      email: '',
      password: '',
      confirm_password: '',
    });
    const errors = ref({
      avatar: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      confirm_password: '',
    });

    const validationRules = ref({
      ...VALIDATION_RULES,
      confirm_password: [
        v => !!v || "Password is required",
        v => v === formData.value.password || "Passwords must match",
      ]
    })

    const createMultipartFormData = obj => {
      const newFormData = new FormData();
      for (const field in obj.value) {
        if (field !== 'avatar') {
          if (['name', 'surname', 'phone'].includes(field)) {
            newFormData.append(`profile.${field}`, obj.value[field]);
          } else {
            newFormData.append(field, obj.value[field]);
          }
        } else if (field === 'avatar' && obj.value[field] && obj.value[field][0]) {
          newFormData.append(`profile.${field}`, obj.value[field][0]);
        }
      }
      return newFormData;
    }

    const submitUserRegistrationForm = async () => {
      const isFormValid = formUtils.formValidator(formData, validationRules);
      if (!isFormValid) {
        return;
      }

      try {
        const multipartFormData = createMultipartFormData(formData);
        const { status } = await authUserApi.registerUser(multipartFormData);
        registration.value.done = status === 201;
      } catch (err) {
        errors.value = objUtils.createEmptyObject(errors.value);
        errors.value = objUtils.mergeObjects(errors.value, err.response.data);
      }
    };

    return {
      FIELDS_FORM_REGISTRATION,
      validationRules,
      registration,
      formData,
      errors,
      submitUserRegistrationForm,
    };
  }
};
</script>

<style scoped>
.v-form > *:not(:last-child) {
  margin-bottom: 10px;
}
</style>
