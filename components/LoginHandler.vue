<script setup lang="ts">
import {ref} from "vue"
import Button from 'primevue/button';
import LoginForm from "~/components/LoginForm.vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {AuthAdministrationControllerClient} from "~/utils/apiQueries.ts";
const { loggedIn, user, clear, fetch: refreshSession } = useUserSession()

const loginMenu = ref();
const showLoginForm = ref(false);

const userLoginIcon = () => {
  return loggedIn.value ? 'pi pi-user' : 'pi pi-sign-in';
}
const userLoginLabel = () => {
  return loggedIn.value ? user.value?.name : 'Войти';
}
const processLogin = (event) => {
  if(loggedIn.value) { loginMenu.value.toggle(event) }
  else { showLoginForm.value = true }
}
const loginMenuItems = ref([
  { label: 'Выйти',
    icon: 'pi pi-sign-out',
    command: () => { clear(); }
  }
]);
const loginFinished = () => {
  refreshSession();
  closeLoginForm();
}
const closeLoginForm = () => {
  showLoginForm.value = false;
}
</script>

<template>
  <div>
    <Button :label="userLoginLabel()" :icon="userLoginIcon()"
            @click="processLogin" aria-haspopup="true" aria-controls="overlay_tmenu"/>
    <TieredMenu ref="loginMenu" id="loginMenu" :model="loginMenuItems" popup />
    <LoginForm :show-dialog="showLoginForm" @close="closeLoginForm()" @login="loginFinished()"/>
  </div>
</template>