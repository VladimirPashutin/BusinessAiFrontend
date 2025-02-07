<script setup lang="ts">
import LoginForm from "./LoginForm.vue";
import {useLoginStore} from "../stores/loginStore.ts";

const loginStore = useLoginStore();
let loginErrorMessage = ref(null);
const loginMenu = ref();

const showLoginForm = ref(false)

const processLogin = (event) => {
  if(loginStore.authenticated) {
    loginMenu.value.toggle(event);
  } else { showLoginForm.value = true; }
}
const closeAction = () => {
  loginErrorMessage.value = null;
  showLoginForm.value = false;
}
const loginAction = async (form) => {
  if(await loginStore.doLogin(form)) { showLoginForm.value = false; console.log(loginStore.userInfo) }
  else { loginErrorMessage.value = "С указанными данными регистрация в системе невозможна"; }
  console.log(form)
}
const registerAction = (data) => {
  loginStore.doRegistration(data);
}
const restoreAction = (data) => {
  loginStore.doRestorePassword(data);
}
const userLoginIcon = () => {
  return loginStore.authenticated ? 'pi pi-user' : 'pi pi-sign-in'
}
const userLoginLabel = () => {
  return loginStore.authenticated ? loginStore.userInfo.name : 'Войти'
}
const loginMenuItems = ref([
  { label: 'Выйти',
    icon: 'pi pi-sign-out',
    command: () => { loginStore.doLogout(); closeAction(); }
  }
]);
</script>

<template>
  <Toolbar>
    <template #start>
      <i class="pi pi-book"/>
    </template>
    <template #center>
      <IconField>
        <i class="pi pi-search"/>
        <InputText placeholder="Search"/>
      </IconField>
    </template>
    <template #end>
      <Button :label="userLoginLabel()" :icon="userLoginIcon()"
              @click="processLogin" aria-haspopup="true" aria-controls="overlay_tmenu"/>
      <TieredMenu ref="loginMenu" id="loginMenu" :model="loginMenuItems" popup />
    </template>
  </Toolbar>
  <LoginForm :visible="showLoginForm" :error-message="loginErrorMessage" @close="closeAction"
             @login="loginAction" @register="registerAction" @restore-password="restoreAction"/>
</template>

<style scoped>

</style>