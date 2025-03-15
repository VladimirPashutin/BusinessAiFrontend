<script setup lang="ts">
import {ref,toRef} from "vue"
import {LoginData, RegistrationData} from "../utils/authUtils.ts";

const emits = defineEmits(['close','login','register','restorePassword']);
const props = defineProps<{errorMessage?: string, visible: boolean}>();
const showDialog = toRef(props, 'visible');
const showRegistrationInfo = ref(false);
const showRestorePassword = ref(false);
const showRegistration = ref(false);

const phoneClicked = (form) => {
  doRegistration(form);
}
const passwordClicked = (form) => {
  if(!showRegistration.value) { doLogin(form); }
}
const doLogin = (form) => {
  emits('login', new LoginData(form));
  showRegistrationInfo.value = false;
  showRestorePassword.value = false;
  showRegistration.value = false;
}
const doRegistration = (form) => {
  emits('register', new RegistrationData(form));
  showRegistrationInfo.value = true;
}
const doRestorePassword = (form) => {
  emits('restorePassword', form.login.value);
  showRestorePassword.value = true;
}
const close = () => {
  showRegistrationInfo.value = false;
  showRestorePassword.value = false;
  showRegistration.value = false;
  emits('close');
}
</script>

<template>
  <Dialog :visible="showDialog" header="Регистрация в системе." position="topright" @update:visible="close">
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
        <InputText name="login" class="flex-auto" autocomplete="off" autofocus variant="filled"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <label for="password" class="font-semibold">Пароль:</label>
        </InputGroupAddon>
        <Password name="password" :feedback="false" @keyup.enter="passwordClicked($form)" variant="filled"/>
      </InputGroup>
      <div v-if="showRegistration">
        <InputGroup>
          <InputGroupAddon>
            <label for="repeatPassword" class="font-semibold">Повторите пароль:</label>
          </InputGroupAddon>
          <Password name="repeatPassword" :feedback="false" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="surname" class="font-semibold">Фамилия:</label>
          </InputGroupAddon>
          <InputText name="surname" class="flex-auto" autocomplete="off" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="personName" class="font-semibold">Имя:</label>
          </InputGroupAddon>
          <InputText name="personName" class="flex-auto" autocomplete="off" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="patronymic" class="font-semibold">Отчество:</label>
          </InputGroupAddon>
          <InputText name="patronymic" class="flex-auto" autocomplete="off" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="eMail" class="font-semibold">eMail:</label>
          </InputGroupAddon>
          <input type="email" name="eMail" class="flex-auto" autocomplete="off"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="phone" class="font-semibold">Телефон:</label>
          </InputGroupAddon>
          <InputText name="phone" class="flex-auto" @keyup.enter="phoneClicked($form)" autocomplete="off" variant="filled"/>
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
