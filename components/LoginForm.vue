<script setup lang="ts">
import {form} from "@primevue/metadata";
import {ref, computed} from "@vue/reactivity";
import {makeCredentialsByForm} from "../utils/login.d.ts";
import {AuthHttpClient,RegistrationHttpClient} from "../utils/clientProvider.ts";
import {AuthenticationControllerClient,AuthRegistrationControllerClient} from "../utils/apiQueries.ts"

type dPosition = "center" | "top" | "bottom" | "left" | "right" |
                 "topleft" | "topright" | "bottomleft" | "bottomright";

const {fetch: refreshSession} = useUserSession();
const authClient = new AuthenticationControllerClient(new AuthHttpClient());
const emits = defineEmits(['close','login','register','restorePassword']);
const registrationClient = new AuthRegistrationControllerClient(new RegistrationHttpClient());
const {showDialog, dialogPosition = "center", errorMessage = null} = defineProps<{errorMessage?: string | null,
       dialogPosition?: dPosition, showDialog: boolean}>();
const localError = <string | null>ref(null);
const showRegistrationForm = ref(false);
const showRegistrationInfo = ref(false);
const showRestorePassword = ref(false);
const validLogin = ref(false);
const errorMessageText = computed(() => {
  if(errorMessage !== null && errorMessage !== undefined) { return errorMessage; }
  return localError.value;
});

const [loginModel] = defineModel({
  set(value) {
    if(value === null || value === undefined || value.length === 0)
    { validLogin.value = false; return value; }
    const runtimeConfig = useRuntimeConfig();
    authClient.isLoginExists({application: runtimeConfig.app.applicationName, login: value}).
               catch((e) => { console.log("Ошибка проверки login-а " + e); validLogin.value = false;
                 localError.value = "Проверьте доступность сервера";
               }).then((flag) => validLogin.value = <boolean>flag);
    return value;
  }
})

const initState = () => {
  showRegistrationForm.value = false;
  showRegistrationInfo.value = false;
  showRestorePassword.value = false;
  localError.value = null;
}
const phoneClicked = (form) => {
  doRegistration(form);
}
const passwordClicked = (form) => {
  if(!showRegistrationForm.value)
  { doLogin(form); }
}
const formHeader = () => {
  if(showRegistrationForm.value) { return "Регистрация в системе."; }
  return "Вход в систему.";
}
const doLogin = (event) => {
  console.log("Вход в систему ", event);
  $fetch('/api/login', {
    body: makeCredentialsByForm(event),
    method: 'POST'
  }).then(async () => { await refreshSession();
    emits('login');
    initState();
  }).catch(() => localError.value = "Ошибочные данные для входа в систему")
}
const doRegistration = (form) => {
  const runtimeConfig = useRuntimeConfig();
  const registrationRequest = new RegistrationRequest({
    application: runtimeConfig.app.applicationName,
    credentials: makeCredentialsByForm(form),
    organization: form.organization.value,
    patronymic: form.patronymic.value,
    login: <string>loginModel.value,
    birthday: form.birthday.value,
    name: form.personName.value,
    surname: form.surname.value,
    email: form.eMail.value,
    phone: form.phone.value,
    authType: "BEARER"
  });
  registrationClient.registration(registrationRequest).
                     then((id) => {
                       if(id) { showRegistrationInfo.value = true }
                       else { localError.value = "Для указанных данных регистрация невозможна" }
                     }).catch(() => localError.value = "Непредвиденная ошибка при отправке письма для подтверждения регистрации");
}
const doRestorePassword = () => {
  const runtimeConfig = useRuntimeConfig();
  const restorePassword = new RestorePassword({ applicationName: runtimeConfig.app.applicationName,
                                                     login: <string>loginModel.value});
  registrationClient.restorePassword(restorePassword).
                     then(() => showRestorePassword.value = true).
                     catch(() => localError.value = "Непредвиденная ошибка при отправке письма для смены пароля");
}
const close = () => {
  emits('close');
  initState();
}
</script>

<template>
  <Dialog :visible="showDialog" :header="formHeader()" style="width: 24rem"
          :position="<dPosition>dialogPosition" @update:visible="close">
    <Message v-if="errorMessageText" severity="error">{{errorMessageText}}</Message>
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
        <InputText name="login" type="text" class="flex-auto" variant="filled"
                   autocomplete="username" autofocus v-model="loginModel"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <label for="password" class="font-semibold">Пароль:</label>
        </InputGroupAddon>
        <Password name="password" type="password" :feedback="false" :inputProps="{ autocomplete: 'current-password' }"
                  @keyup.enter="passwordClicked($form)" variant="filled"/>
      </InputGroup>
      <div v-if="showRegistrationForm">
        <InputGroup>
          <InputGroupAddon>
            <label for="repeatPassword" type="password" class="font-semibold">Повторите пароль:</label>
          </InputGroupAddon>
          <Password name="repeatPassword" type="password" :feedback="false" variant="filled"
                    :inputProps="{ autocomplete: 'off' }"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="organization" class="font-semibold">Организация:</label>
          </InputGroupAddon>
          <InputText name="organization" class="flex-auto" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="surname" class="font-semibold">Фамилия:</label>
          </InputGroupAddon>
          <InputText name="surname" type="text" class="flex-auto" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="personName" class="font-semibold">Имя:</label>
          </InputGroupAddon>
          <InputText name="personName" class="flex-auto" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="patronymic" class="font-semibold">Отчество:</label>
          </InputGroupAddon>
          <InputText name="patronymic" class="flex-auto" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="birthday" class="font-semibold">День рождения:</label>
          </InputGroupAddon>
          <DatePicker name="birthday" class="flex-auto"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="eMail" class="font-semibold">eMail:</label>
          </InputGroupAddon>
          <InputText type="email" name="eMail" class="flex-auto"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="phone" class="font-semibold">Телефон:</label>
          </InputGroupAddon>
          <InputText name="phone" class="flex-auto" @keyup.enter="phoneClicked($form)" variant="filled"/>
        </InputGroup>
      </div>
      <ButtonGroup v-if="showRegistrationForm" class="flex justify-end gap-2">
        <Button label="Назад" icon="pi pi-arrow-left" severity="secondary" @click="showRegistrationForm=false" raised/>
        <Button label="Зарегистрироваться" icon="pi pi-user" severity="info" size="small" @click="doRegistration($form)" raised/>
      </ButtonGroup>
      <ButtonGroup v-else class="flex justify-end gap-2">
        <Button label="Новый пользователь" icon="pi pi-user" :disabled="validLogin"
                severity="info" size="small" @click="showRegistrationForm=true" raised/>
        <Button label="Восстановить пароль" icon="pi pi-ellipsis-v" :disabled="!validLogin"
                severity="info" size="small" @click="doRestorePassword()" raised/>
        <Button label="Войти" icon="pi pi-check" severity="success" raised
                @click="doLogin($form)" :disabled="!validLogin"/>
      </ButtonGroup>
    </Form>
  </Dialog>
</template>
