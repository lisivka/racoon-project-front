<template>
  <v-container>
    <h1 class="mb-5">
      User settings
    </h1>
    <v-card
        max-width="480"
        class="elevation-0 mx-auto"
    >

      <v-container class="user-property-wrapper">
        <div class="user-property">
          <v-img
              :src="`${BASE_URL}${authUser.profile.avatar}`"
              class="avatar"
          />
          <div class="property">
            <font-awesome-icon
                icon="fas fa-trash"
                @click="submitDeleteAvatarForm"
            />
            <font-awesome-icon
                icon="fas fa-camera"
                @click="switchForm('updateAvatar')"
            />
          </div>
        </div>
        <v-form
            v-if="isOpenForm.updateAvatar"
            @submit.prevent="submitUpdateUserAvatarForm"
        >
          <v-file-input
              v-model="avatarUpdateFormData.avatar"
              label="Avatar"
              :rules="validationRules.avatar"
              :error-messages="errors.profile.avatar"
              prepend-icon="mdi-camera"
              show-size
              accept=".png, .jpeg, .jpg"
          />
          <GroupFormButtons
              summit-button-name="Save profile"
              :cancel-button-click-function="() => switchForm('updateAvatar')"
          />
        </v-form>
      </v-container>

      <v-container
          v-for="(field, key) in NON_CHANGEABLE_USER_SETTINGS_FIELDS"
          :key="key"
          class="user-property-wrapper"
      >
        <div class="user-property">
          <strong>{{ field }}:</strong>
          <div class="property">
            {{ authUser.profile[field] || authUser[field] || '-' }}
          </div>
        </div>
      </v-container>

      <v-container
          v-for="(value, key) in CHANGEABLE_USER_FIELDS"
          :key="key"
          class="user-property-wrapper"
      >
        <div class="user-property">
          <strong>{{ value.label }}:</strong>
          <div class="property">
            {{ authUser.profile[value.fieldName] || authUser[value.fieldName] || '-' }}
            <font-awesome-icon
                icon="fas fa-edit"
                @click="switchForm(value.label)"
            />
          </div>
        </div>
        <v-form
            v-if="isOpenForm[value.label]"
            @submit.prevent="() => submitUpdateUserProfileForm(value.label, value.dataForm)"
        >
          <v-text-field
              :label="value.label"
              v-model="value.dataForm[value.field]"
              :error-messages="errors.profile[value.fieldName]"
          />
          <div class="button-right">
            <BaseButton
                type="submit"
                button-name="Save profile"
            />
          </div>
        </v-form>
      </v-container>

      <v-container class="user-property-wrapper mt-10">
        <div class="user-property">
          <BaseButton
              button-name="Change password"
              @click="switchForm('changePassword')"
              class="mb-5 mx-auto"
          />
        </div>
        <h4
            class="password-change-successful"
            v-if="isPasswordChanged"
        >
          Password changed successfully!
        </h4>
        <v-form
            v-if="isOpenForm.changePassword"
            @submit.prevent="submitUpdateUserPasswordForm"
        >
          <v-text-field
              v-for="(value, key) in CHANGE_PASSWORD_FIELDS"
              :key="key"
              :label="value.label"
              v-model="userPasswordUpdateFormData[value.field]"
              :rules="validationRules[value.field]"
              :error-messages="errors[value.field]"
              type="password"
          />
          <GroupFormButtons
              summit-button-name="Apply"
              :cancel-button-click-function="() => switchForm('changePassword')"
          />
        </v-form>
      </v-container>

      <v-container class="d-flex user-property-wrapper mt-10 pb-10">
        <div class="user-property justify-center">
          <ModalWindow
              open-button-text="Delete account"
              close-button-text="Cancel"
          >
            <v-form @submit.prevent="submitDeleteUserForm">
              <v-card-text class="mb-10">
                Confirm deletion of the account.
              </v-card-text>
              <v-text-field
                  label="Current password"
                  v-model="userDeleteFormData.current_password"
                  :rules="validationRules.current_password"
                  :error-messages="errors.current_password"
                  type="password"
              />
              <BaseButton
                  button-name="Confirm delete"
                  type="submit"
                  block
              />
            </v-form>
          </ModalWindow>
        </div>
      </v-container>

    </v-card>
  </v-container>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { usersApi } from '@/api';
import { auth, objUtils, formUtils } from '@/utils';
import { BASE_URL, VALIDATION_RULES, CHANGE_PASSWORD_FIELDS, NON_CHANGEABLE_USER_SETTINGS_FIELDS } from '@/constants';
import BaseButton from '@/components/BaseButton';
import GroupFormButtons from '@/components/GroupFormButtons';
import ModalWindow from '@/components/ModalWindow';

export default {
  name: 'SettingsUserProfilePage',
  components: {
    BaseButton,
    GroupFormButtons,
    ModalWindow,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isPasswordChanged = ref(false);
    const isOpenForm = ref({
      updateAvatar: false,
      name: false,
      surname: false,
      phone: false,
      changePassword: false,
    });
    const authUser = computed(() => store.state.authUser.user);
    const avatarUpdateFormData = ref({ avatar: '' });
    const userNameUpdateFormData = ref({ 'profile.name': '' });
    const userSurnameUpdateFormData = ref({ 'profile.surname': '' });
    const userPhoneUpdateFormData = ref({ 'profile.phone': '' });
    const userPasswordUpdateFormData = ref({
      current_password: '',
      new_password: '',
      re_new_password: '',
    });
    const userDeleteFormData = ref({ current_password: '' });
    const errors = ref({
      profile: {
        avatar: '',
        name: '',
        surname: '',
        phone: '',
      },
      email: '',
      current_password: '',
      new_password: '',
      re_new_password: '',
    });
    const validationRules = ref({
      ...VALIDATION_RULES,
      re_new_password: [
        v => !!v || "Password is required",
        v => v === userPasswordUpdateFormData.value.new_password || "Passwords must match",
      ]
    });
    // constant for changeable user fields that do not require password confirmation
    const CHANGEABLE_USER_FIELDS = [
      { field: 'profile.name', fieldName: 'name', dataForm: userNameUpdateFormData.value, label: 'Name' },
      { field: 'profile.surname', fieldName: 'surname', dataForm: userSurnameUpdateFormData.value, label: 'Surname' },
      { field: 'profile.phone', fieldName: 'phone', dataForm: userPhoneUpdateFormData.value, label: 'Phone' },
    ];

    const switchForm = form => {
      isOpenForm.value[form] = !isOpenForm.value[form];
    };

    const errorHandler = (errorsData, err) => {
      // remove old errors
      errorsData.value = objUtils.createEmptyObject(errorsData.value);
      // add new errors
      errorsData.value = objUtils.mergeObjects(errorsData.value, err.response.data);
    }

    const submitUpdateUserAvatarForm = async () => {
      const isFormValid = formUtils.formValidator(avatarUpdateFormData, validationRules)

      if (isFormValid && avatarUpdateFormData.value.avatar && avatarUpdateFormData.value.avatar[0]) {
        const newFormData = new FormData();
        newFormData.append('profile.avatar', avatarUpdateFormData.value.avatar[0]);

        try {
          const { data } = await usersApi.updateUserAvatar(newFormData);
          store.commit('authUser/setUserData', data);
          avatarUpdateFormData.value = objUtils.createEmptyObject(avatarUpdateFormData.value);
          switchForm('updateAvatar');
        } catch (err) {
          errorHandler(errors, err);
        }
      }
    };

    const submitDeleteAvatarForm = async () => {
      const newFormData = new FormData();
      newFormData.append('profile.avatar', '');

      try {
        const { data } = await usersApi.updateUserAvatar(newFormData);
        store.commit('authUser/setUserData', data);
      } catch (err) {
        errorHandler(errors, err);
      }
    };

    const submitUpdateUserProfileForm = async (field, fieldData) => {
      const isFormValid = formUtils.formValidator(fieldData, validationRules)
      if (!isFormValid) {
        return;
      }

      try {
        const { data } = await usersApi.changeUserProfile(fieldData);
        store.commit('authUser/setUserData', data);
        fieldData.value = objUtils.createEmptyObject(fieldData);
        switchForm(field);
      } catch (err) {
        errorHandler(errors, err);
      }
    };

    const submitUpdateUserPasswordForm = async () => {
      const isFormValid = formUtils.formValidator(userPasswordUpdateFormData, validationRules)
      if (!isFormValid) {
        return;
      }

      try {
        const { status } = await usersApi.changeUserPassword(userPasswordUpdateFormData.value);
        if (status === 204) {
          userPasswordUpdateFormData.value = objUtils.createEmptyObject(userPasswordUpdateFormData.value);
          switchForm('changePassword');
          isPasswordChanged.value = true;
          setTimeout(() => {
            isPasswordChanged.value = false;
          }, 5000);
        }
      } catch (err) {
        errorHandler(errors, err);
      }
    };

    const submitDeleteUserForm = async () => {
      const isFormValid = formUtils.formValidator(userDeleteFormData, validationRules)
      if (!isFormValid) {
        return;
      }

      try {
        const { status } = await usersApi.deleteMyUser(userDeleteFormData.value);
        if (status === 204) {
          auth.logoutUser();
          router.push('/');
        }
      } catch (err) {
        errorHandler(errors, err);
      }
    };

    return {
      authUser,
      errors,
      validationRules,
      isOpenForm,
      avatarUpdateFormData,
      userNameUpdateFormData,
      userSurnameUpdateFormData,
      userPasswordUpdateFormData,
      userDeleteFormData,
      isPasswordChanged,
      switchForm,
      submitDeleteAvatarForm,
      submitUpdateUserAvatarForm,
      submitUpdateUserProfileForm,
      submitUpdateUserPasswordForm,
      submitDeleteUserForm,
      BASE_URL,
      NON_CHANGEABLE_USER_SETTINGS_FIELDS,
      CHANGEABLE_USER_FIELDS,
      CHANGE_PASSWORD_FIELDS,
    }
  }
};
</script>

<style scoped>
.avatar {
  max-width: 150px;
  height: 150px;
  width: auto;
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 15px;
}
.user-property-wrapper {
  margin-top: 20px;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
}
.user-property {
  display: flex;
  flex-direction: row;
}
.property {
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  margin-left: 40px;
  padding-bottom: 10px;
  align-items: center;
}
.button-right {
  display: flex;
  justify-content: flex-end;
}
.password-change-successful {
  color: green;
}
</style>
