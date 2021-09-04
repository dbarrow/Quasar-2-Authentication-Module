<template>

  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-card class="login-card fixed-center q-pa-md gt-xs" style="width: 350px">
        <q-card-section class="">
          
          <router-view />
        </q-card-section>
      </q-card>

      <div class="lt-sm q-ma-lg">
        
          <router-view />
      </div>
    </q-page-container>
  </q-layout>

</template>

<style lang="scss" >
.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
  font-size: 16px !important;
}
</style>

