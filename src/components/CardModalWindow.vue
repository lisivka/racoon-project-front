<template>
  <ModalWindow
      :open-button-text="mainButtonText"
      close-button-text="Cancel"
  >
    <v-card-text class="mb-10">
      {{ mainText }}
    </v-card-text>
    <BaseButton
        block
        button-name="Confirm"
        @click="onClickFunction"
    />
  </ModalWindow>
</template>

<script>
import ModalWindow from '@/components/ModalWindow';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'CardModalWindow',
  components: {
    ModalWindow,
    BaseButton,
  },
  props: {
    mainButtonText: String,
    mainText: String,
    onClickFunction: Function,
  }
}
</script>
