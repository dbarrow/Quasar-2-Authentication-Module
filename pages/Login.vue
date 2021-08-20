<template>
  <q-card class="login-card fixed-center q-pa-lg" >
    <q-card-section>
      <form @submit.prevent.stop="login" >
      <q-input
         ref="emailRef"
         v-model="email"
         label="Email"
         :rules="[(val) => !!val || 'Email is required']">
        </q-input>
        <q-input
          type="password"
          ref="passwordRef"
          v-model="password"
          label="Password"
          :rules="[(val) => !!val || 'Passwoord is required']"
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
        <div class="row q-mt-lg">
          <q-btn type="submit" color="blue" text-color="white" label="Login" class="col-grow"/>
        </div>
      </form>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import authConfig from "../auth.config";

export default {
  setup() {
    const email = ref();
    const emailRef = ref(null);

    const password = ref();
    const passwordRef = ref(null);

    const $store = useStore();
    const $router = useRouter();

    const loginError = ref(false);


    function login() {

      loginError.value = false

      emailRef.value.validate();
      passwordRef.value.validate();

      let loading = true;
      let user = { email: email.value, password: password.value };
      console.log(user);
      $store.dispatch("auth/login", user).then(
        () => {
          console.log(authConfig.SUCCESSFUL_LOGIN_ROUTE)
          $router.push(authConfig.SUCCESSFUL_LOGIN_ROUTE);
        },
        (error) => {
          loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(error.response.data.message);
          loginError.value = this.message;
        }
      );
    }

    return { email, password, emailRef, passwordRef, login, loginError};
  },
};
</script>

<style>

.login-card {
  width: 350px;
}
</style>
