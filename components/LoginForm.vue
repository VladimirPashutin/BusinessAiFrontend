<script setup lang="ts">
import {Form} from "@primevue/forms";
import {ref, computed} from "@vue/reactivity";
import {ApiHttpClient} from "../utils/clientProvider.ts";
import {makeCredentialsByForm, makeCredentialsFromData} from "../utils/login.d.ts";
import {AuthenticationControllerClient, AuthRegistrationControllerClient} from "../utils/apiQueries.ts"

type dPosition = "center" | "top" | "bottom" | "left" | "right" |
    "topleft" | "topright" | "bottomleft" | "bottomright";

const {fetch: refreshSession} = useUserSession();
const emits = defineEmits(['close', 'login', 'register', 'restorePassword']);
const {showDialog, dialogPosition = "center", errorMessage = null} = defineProps<{
  errorMessage?: string | null,
  dialogPosition?: dPosition, showDialog: boolean
}>();
const localError = ref("");
const showRegistrationForm = ref(false);
const showRegistrationInfo = ref(false);
const showRestorePassword = ref(false);
const validLogin = ref(false);
const errorMessageText = computed(() => {
  if (errorMessage !== null && errorMessage !== undefined) {
    return errorMessage;
  }
  return localError.value;
});

const [loginModel] = defineModel({
  set(value) {
    if (value === null || value === undefined || value.length === 0) {
      validLogin.value = false;
      return value;
    }
    const runtimeConfig = useRuntimeConfig();
    new AuthenticationControllerClient(new ApiHttpClient()).
    isLoginExists({
      application: runtimeConfig.app.applicationName,
      login: value
    }).catch((e) => {
      console.log("Ошибка проверки login-а " + e);
      validLogin.value = false;
      localError.value = "Проверьте доступность сервера";
    }).then((flag) => validLogin.value = <boolean>flag);
    return value;
  }
})

const resolver = ({ values }) => {
  const errors = {} as any;

  if (!values.login) {
    errors.login = [{ message: 'Логин для входа в систему обязательно должен быть указан.' }];
  }

  return {
    values, // (Optional) Used to pass current form values to submit event.
    errors
  };
};

const initState = () => {
  showRegistrationForm.value = false;
  showRegistrationInfo.value = false;
  showRestorePassword.value = false;
  localError.value = "";
}
const phoneClicked = (form) => {
  doRegistration(form);
}
const passwordClicked = (form) => {
  if (!showRegistrationForm.value) {
    doLogin(form);
  }
}
const formHeader = () => {
  if (showRegistrationForm.value) {
    return "Регистрация в системе.";
  }
  return "Вход в систему.";
}
const doLogin = (form) => {
  let requestBody = makeCredentialsByForm(form);
  if(form.login.value === null) {
    requestBody = makeCredentialsFromData(<string>loginModel.value, form.password.value);
  }
  //@ts-ignore
  $fetch('/api/login', {
    method: 'POST',
    body: requestBody
  }).then(async () => {
    await refreshSession();
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
  new AuthRegistrationControllerClient(new ApiHttpClient()).
      registration(registrationRequest).then((id) => {
    if (id) {
      showRegistrationInfo.value = true
    } else {
      localError.value = "Для указанных данных регистрация невозможна"
    }
  }).catch(() => localError.value = "Непредвиденная ошибка при отправке письма для подтверждения регистрации");
}
const doRestorePassword = () => {
  const runtimeConfig = useRuntimeConfig();
  const restorePassword = new RestorePassword({
    applicationName: runtimeConfig.app.applicationName,
    login: <string>loginModel.value
  });
  new AuthRegistrationControllerClient(new ApiHttpClient()).
      restorePassword(restorePassword).
      then(() => showRestorePassword.value = true).
      catch(() => localError.value = "Непредвиденная ошибка при отправке письма для смены пароля");
}
const close = () => {
  emits('close');
  initState();
}
</script>

<template>
  <Dialog :visible="showDialog" :header="formHeader()" style="width: 26rem"
          :position="<dPosition>dialogPosition" @update:visible="close">
    <Message v-if="errorMessageText" severity="error">{{ errorMessageText }}</Message>
    <div v-if="showRestorePassword">
      <Message severity="info">На указанную при регистрации почту отправлено письмо с инструкциями по восстановлению
        пароля
      </Message>
      <Button label="Закрыть" icon="pi pi-check" severity="success" @click="close" raised/>
    </div>
    <div v-else-if="showRegistrationInfo">
      <Message severity="info">На указанную почту отправлено письмо для подтверждения регистрации</Message>
      <Button label="Закрыть" icon="pi pi-check" severity="success" @click="close" raised/>
    </div>
    <Form v-else v-slot="$form" :resolver @submit="doLogin($form)">
      <InputGroup>
        <InputGroupAddon>
          <label for="login">Имя пользователя:</label>
        </InputGroupAddon>
        <InputText id="login" name="login" type="text" variant="filled"
                   autocomplete="username" autofocus v-model="loginModel"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <label for="password">Пароль:</label>
        </InputGroupAddon>
        <Password id="password" name="password" type="password" :feedback="false" variant="filled"
                  :inputProps="{ autocomplete: 'current-password' }" @keyup.enter="passwordClicked($form)"/>
      </InputGroup>
      <div v-if="showRegistrationForm">
        <InputGroup>
          <InputGroupAddon>
            <label for="repeatPassword">Повторите пароль:</label>
          </InputGroupAddon>
          <Password id="repeatPassword" name="repeatPassword" type="password"
                    :feedback="false" variant="filled" :inputProps="{ autocomplete: 'off' }"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="organization">Организация:</label>
          </InputGroupAddon>
          <InputText id="organization" name="organization" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="surname">Фамилия:</label>
          </InputGroupAddon>
          <InputText id="surname" name="surname" type="text" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="personName">Имя:</label>
          </InputGroupAddon>
          <InputText id="personName" name="personName" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="patronymic">Отчество:</label>
          </InputGroupAddon>
          <InputText id="patronymic" name="patronymic" variant="filled"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="eMail">eMail:</label>
          </InputGroupAddon>
          <InputText type="email" id="eMail" name="eMail"/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <label for="phone">Телефон:</label>
          </InputGroupAddon>
          <InputText id="phone" name="phone" @keyup.enter="phoneClicked($form)" variant="filled"/>
        </InputGroup>
      </div>
      <ButtonGroup v-if="showRegistrationForm">
        <Button label="Назад" icon="pi pi-arrow-left" severity="secondary" @click="showRegistrationForm=false" raised/>
        <Button label="Зарегистрироваться" icon="pi pi-user" severity="info" size="small" @click="doRegistration($form)"
                raised :disabled="validLogin"/>
      </ButtonGroup>
      <ButtonGroup v-else>
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
