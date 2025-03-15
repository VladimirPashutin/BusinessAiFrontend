<script setup lang="ts">
import {ref} from "vue";
import LoginForm from "./LoginForm.vue";

defineEmits(['toggleSidebar']);

let loginErrorMessage = ref(null);
const loginMenu = ref();

const showLogin = ref(false);

const processLogin = (event) => {
  console.log('Запрос сессии', event);
  useUserSession().fetch();
}
const closeAction = () => {
  loginErrorMessage.value = null;
  showLogin.value = false;
}
const loginAction = async (form) => {
}
const registerAction = (data) => {
}
const restoreAction = (data) => {
}
const userLoginIcon = () => {
  // return loginStore.authenticated ? 'pi pi-user' : 'pi pi-sign-in';
  return '';
}
const userLoginLabel = () => {
  // return loginStore.authenticated ? loginStore.userInfo.name : 'Войти';
  return "";
}
const loginMenuItems = ref([
  { label: 'Выйти',
    icon: 'pi pi-sign-out',
    // command: () => { loginStore.doLogout(); closeAction(); }
  }
]);
</script>

<template>
  <Toolbar>
    <template #start>
      <img @click="$emit('toggleSidebar')" src="../public/favicon.ico" alt="t3t"/>
    </template>
    <template #center>
      <IconField>
        <InputIcon class="pi pi-search"/>
        <InputText placeholder="Search"/>
      </IconField>
    </template>
    <template #end>
      <Button :label="userLoginLabel()" :icon="userLoginIcon()"
              @click="processLogin" aria-haspopup="true" aria-controls="overlay_tmenu"/>
      <TieredMenu ref="loginMenu" id="loginMenu" :model="loginMenuItems" popup />
    </template>
  </Toolbar>
  <LoginForm :visible="showLogin" :error-message="loginErrorMessage" @close="closeAction"
             @login="loginAction" @register="registerAction" @restore-password="restoreAction"/>
</template>
