<script setup lang="ts">
import {LoginData, RegistrationData} from "../utils/authUtils.ts";

const props = defineProps<{errorMessage?: string, visible: boolean}>();
const emits = defineEmits(['close','login','register','restorePassword']);
const showRegistrationInfo = ref(false)
const showRestorePassword = ref(false)
const showRegistration = ref(false)
const showForm = toRef(props, 'visible')
console.log("Login form show ", showForm.value)
const phoneClicked = (form) => {
  doRegistration(form);
}
const passwordClicked = (form) => {
  if(!showRegistration.value) { doLogin(form); }
}
const doLogin = (form) => {
  console.log("Login with", form)
  showRegistrationInfo.value = false
  showRestorePassword.value = false
  showRegistration.value = false
  emits('login', new LoginData(form))
}
const doRegistration = (form) => {
  showRegistrationInfo.value = true
  emits('register', new RegistrationData(form))
}
const doRestorePassword = (form) => {
  emits('restorePassword', form.login.value)
  showRestorePassword.value = true;
}
const close = () => {
  showRegistrationInfo.value = false
  showRestorePassword.value = false
  showRegistration.value = false
  emits('close')
}
</script>

<template>
  <Dialog :visible="showForm" header="Регистрация в системе." position="topright" @close="close">
    <Message v-if="props.errorMessage" severity="error">{{props.errorMessage}}</Message>
    <div v-if="showRestorePassword">
      <Message severity="info">На указанную при регистрации почту отправлено письмо с инструкциями по восстановлению пароля</Message>
      <Button label="Закрыть" icon="pi pi-check" severity="success" @click="close" raised/>
    </div>
    <div v-else-if="showRegistrationInfo">
      <Message severity="info">На указанную почту отправлено письмо для подтверждения регистрации</Message>
      <Button label="Закрыть" icon="pi pi-check" severity="success" @click="close" raised/>
    </div>
    <Form v-else v-slot="$form" @submit="doLogin" class="flex flex-col w-full">
      <InputGroup>
        <InputGroupAddon>
          <label for="login" class="font-semibold">Имя пользователя:</label>
        </InputGroupAddon>
        <InputText name="login" style="padding: 10px" class="flex-auto" autocomplete="off" autofocus variant="filled"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <label for="password" class="font-semibold">Пароль:</label>
        </InputGroupAddon>
        <Password name="password" style="padding: 10px" :feedback="false" @keyup.enter="passwordClicked($form)" variant="filled"/>
      </InputGroup>
      <div v-if="showRegistration">
        <InputGroup>
          <InputGroupAddon>
            <label for="repeatPassword" class="font-semibold">Повторите пароль:</label>
          </InputGroupAddon>
          <Password name="repeatPassword" style="padding: 10px" :feedback="false" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="surname" class="font-semibold">Фамилия:</label>
          </InputGroupAddon>
          <InputText name="surname" style="padding: 10px" class="flex-auto" autocomplete="off" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="personName" class="font-semibold">Имя:</label>
          </InputGroupAddon>
          <InputText name="personName" style="padding: 10px" class="flex-auto" autocomplete="off" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="patronymic" class="font-semibold">Отчество:</label>
          </InputGroupAddon>
          <InputText name="patronymic" style="padding: 10px" class="flex-auto" autocomplete="off" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="eMail" class="font-semibold">eMail:</label>
          </InputGroupAddon>
          <InputText name="eMail" style="padding: 10px" class="flex-auto" autocomplete="off" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="phone" class="font-semibold">Телефон:</label>
          </InputGroupAddon>
          <InputText name="phone" style="padding: 10px" class="flex-auto" @keyup.enter="phoneClicked($form)" autocomplete="off" variant="filled"/>
        </InputGroup>
      </div>
      <ButtonGroup v-if="showRegistration" class="flex justify-end gap-2">
        <Button label="Зарегистрироваться" icon="pi pi-user" severity="info" size="small" @click="doRegistration($form)" raised/>
        <Button label="Уже зарегистрирован" icon="pi pi-check" severity="success" @click="doLogin($form)" raised/>
      </ButtonGroup>
      <ButtonGroup v-else class="flex justify-end gap-2">
        <Button label="Новый пользователь" icon="pi pi-user" severity="info" size="small" @click="showRegistration=true" raised/>
        <Button label="Восстановить пароль" icon="pi pi-ellipsis-v" severity="info" size="small" @click="doRestorePassword($form)" raised/>
        <Button label="Войти" icon="pi pi-check" severity="success" @click="doLogin($form)" raised/>
      </ButtonGroup>
    </Form>
  </Dialog>
</template>

<style scoped>

</style>