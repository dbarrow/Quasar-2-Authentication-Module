<template>
  <q-card class="login-card fixed-center q-pa-lg">
    <q-card-section>
      {{ isValid }}
      <form  @submit.prevent.stop="register" class="q-gutter-md" @validation-success="!isValid">
        <q-input
          ref="nameRef"
          v-model="name"
          label="Name"
          :rules="[(val) => !!val || 'Nmae is required']"
        >
        </q-input>

        <q-input
          debounce="500"
          ref="emailRef"
          v-model="email"
          label="Email"
          :rules="[
            (val) => !!val || 'Email is required',
            (val) => emailExist(val) || 'Email exists',
            $rules.email('not a valid email'),
          ]"
        >
        </q-input>

        <q-input
          ref="companyRef"
          v-model="companyName"
          label="Company Name"
          :rules="[(val) => !!val || 'Compnay Name is required']"
        >
        </q-input>

        <q-input
          autocomplete="new-password"
          :type="isPwd ? 'password' : 'text'"
          ref="passwordRef"
          v-model="password"
          label="Password"
          :rules="[
            (val) => !!val || 'Password is required',

            $rules.minLength(
              6,
              'Password must be contain at least 6 characters'
            ),
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-input
          autocomplete="new-password"
          :type="isConfirmPwd ? 'password' : 'text'"
          ref="passwordConfirmationRef"
          v-model="passwordConfirmation"
          label="Password Confirmation"
          :rules="[
            (val) => !!val || 'Password is required',
            $rules.sameAs(password, 'Passwords do not match'),
            $rules.minLength(
              6,
              'Password must be contain at least 6 characters'
            ),
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd"
            />
          </template>
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
          <q-btn
            :disabled="isValid"
            type="submit"
            color="blue"
            text-color="white"
            label="Register"
            class="col-grow"
          />
        </div>
      </form>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import authService from "src/modules/auth/auth.service";

export default {
  setup() {
    const name = ref();
    const nameRef = ref("");

    const email = ref();
    const emailRef = ref("");

    const companyName = ref();
    const companyRef = ref("");

    const password = ref();
    const passwordRef = ref("");

    const passwordConfirmation = ref();
    const passwordConfirmationRef = ref("");

    const $store = useStore();
    const $router = useRouter();

    const isPwd = ref(true);
    const isConfirmPwd = ref(true);

    const isValid = computed(() => {
      if (
        name.value &&
        companyName.value &&
        email.value &&
        password.value &&
        passwordConfirmation.value
        && passwordConfirmation.value == password.value
      ) {
        return false;
      }
      return true;
    });

    const loginError = ref(false);

    function register() {
      loginError.value = false;

      let loading = true;
      let user = {
        name: name.value,
        email: email.value,
        // companyName: companyName.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      };
      $store.dispatch("auth/register", user).then(
        () => {
          console.log(user);
          $router.push("/app");
        },
        (error) => {
          loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          // console.log(this.message.password[0]);
          // loginError.value = this.message.password[0];
        }
      );
    }

    function emailExist(email) {
      return new Promise((resolve, reject) => {
        authService.emailExist(email).then((result) => {
          console.log(email);
          console.log(result.data.data.emailExist);

          if (result.data.data.emailExist == true) {
            email = false;
            resolve(!!email || "Email already Exists");
          }

          resolve(true);
        });
      });
    }

    return {
      name,
      email,
      password,
      nameRef,
      companyRef,
      companyName,
      emailRef,
      passwordRef,
      passwordConfirmation,
      passwordConfirmationRef,
      register,
      loginError,
      emailExist,
      isValid,
      isPwd,
      isConfirmPwd,
    };
  },
};
</script>

<style>
.login-card {
  width: 350px;
}
</style>
