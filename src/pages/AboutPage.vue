<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="display-2">About</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div
            class="body-1"
            v-for="item in text"
            :key="item"
        >
          {{ item }}
        </div>
        <a
            href="mailto:contact@heloscompany.com"
            class="link"
        >
          contact@heloscompany.com
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutPage',
  setup(){
    const text = [
      "Welcome to Auctions",
      "....",
      "....",
      "Our office is located in the city of Kyiv.",
      "For inquiries, please reach out to our team at:"
    ]
    return {text}
  }
};
</script>
