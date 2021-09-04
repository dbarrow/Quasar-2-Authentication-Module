<template>
 
      <form @submit.prevent.stop="changePassword" >
      
        <q-input
          type="password"
          ref="passwordRef"
          v-model="password"
          label="Password"
          :rules="[(val) => !!val || 'Passwoord is required']"
        >
        </q-input>


        <q-input
          type="password"
          ref="passwordConfirmationRef"
          v-model="passwordConfirmation"
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
          <q-btn type="submit" color="blue" text-color="white" label="Reset Password" class="col-grow"/>
        </div>
      </form>
   
</template>

<script>

import { ref, computed} from "vue";
import authService  from '../auth.service'
import {useStore} from 'vuex'

export default {
    setup() {
        const password = ref('')
        const passwordConfirmation = ref('')
        const passwordRef = ref('')
        const passwordConfirmationRef = ref('')
        const $store = useStore()

        

        function changePassword(){

            let passwords = {password: password.value, passwordConfirmation: passwordConfirmation.value} 

 $store.dispatch("auth/resetPassword",passwords).then(
        (response) => {
     console.log( "store users" ,response)
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
     
    return { password, passwordConfirmation, passwordConfirmationRef, passwordRef, changePassword}

}
}
</script>

<style>

</style>