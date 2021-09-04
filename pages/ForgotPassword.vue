<template>
  <form @submit.prevent.stop="submitForgotPassword">
    <h6 class="no-margin flex flex-center q-pb-lg">Forgot Password</h6>
    <q-input
      ref="emailRef"
      v-model="email"
      label="Email"
      :rules="[(val) => !!val || 'Email is required']"
    >
    </q-input>

    <q-banner
      v-if="errors"
      inline-actions
      rounded
      class="bg-red text-white q-mb-md"
    >
      {{ errors }}
    </q-banner>
    <div class="row q-mt-lg">
      <q-btn
        type="submit"
        color="blue"
        text-color="white"
        label="Submit"
        class="col-grow"
      />
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import authService from "../auth.service";
export default {
  setup() {
    const email = ref();
    const errors = ref(false);
    function submitForgotPassword() {
      authService.forgotPassword(email.value);
      console.log("submit");
    }
    return { email, submitForgotPassword, errors };
  },
};
</script>

<style></style>
