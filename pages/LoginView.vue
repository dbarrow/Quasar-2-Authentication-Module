<template>
  <form @submit.prevent.stop="login">
    <h6 class="no-margin flex flex-center q-pb-lg">Login</h6>

    <q-input
      autofocus
      ref="emailRef"
      v-model="email"
      label="Email"
      :rules="[(val) => !!val || 'Email is required']"
    >
    </q-input>

    <q-input
      type="password"
      ref="passwordRef"
      v-model="password"
      label="Password"
      :rules="[(val) => !!val || 'Password is required']"
    >
    </q-input>

    <q-banner
      v-if="loginError"
      inline-actions
      rounded
      class="bg-red text-white q-mb-md"
    >
      {{ loginError }}
    </q-banner>

    <div class="row flex flex-center q-mt-lg">
      <router-link to="forgotpassword"> Forgot Password? </router-link>
    </div>

    <div class="row flex flex-center q-mt-lg">
      <router-link to="register"> Register </router-link>
    </div>

    <div class="row q-mt-lg">
      <q-btn
        type="submit"
        color="blue"
        text-color="white"
        label="Login"
        class="col-grow"
      />
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../auth.store";
import { useRouter } from "vue-router";
import authConfig from "../auth.config";

export default {
  setup() {
    const email = ref();
    const emailRef = ref(null);

    const password = ref();
    const passwordRef = ref(null);

    const $store = useAuthStore();
    const $router = useRouter();

    const loginError = ref(false);

    function login() {
      emailRef.value.validate();
      passwordRef.value.validate();
      let user = { email: email.value, password: password.value };
      $store.login(user).then(
        (response) => {
          $router.push(authConfig.SUCCESSFUL_LOGIN_ROUTE);
        },
        (error) => {
          loginError.value = error.response.data.message.toString();
        }
      );
    }
    return { email, password, emailRef, passwordRef, login, loginError };
  },
};
</script>

<style>
.login-card {
  width: 350px;
}
</style>
