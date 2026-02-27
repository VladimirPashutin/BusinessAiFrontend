<script setup lang="ts">
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {makeCredentialsFromData} from "../../../utils/login.d.ts";
import {AuthRegistrationControllerClient} from "../../../utils/apiQueries.ts"

const errorMessage = ref(<string | null>null);

const route = useRoute();

const dialogVisible = ref(true);

const formHeader = () => {
  return "Обновление пароля для " + route.params.login
}
const validatePassword = (form) => {
  if(form.repeatPassword === null || form.repeatPassword === undefined ||
     form.password === null || form.password === undefined || form.password.value === null ||
     form.password.value === undefined || form.password.value.length < 8 ||
     form.repeatPassword.value !== form.password.value) {
    errorMessage.value = "Пароли должны совпадать и длина должна быть не менее 8 символов";
  } else { errorMessage.value = null; }
}
const doChangePassword = async (form) => {
  validatePassword(form);
  if(!errorMessage.value) { const data = new ChangePassword({
      passwordHash: makeCredentialsFromData(<string>route.params.login, form.password.value),
      id: <string>route.params.id
    });
    const runtimeConfig = useRuntimeConfig();
    await new AuthRegistrationControllerClient(new ApiHttpClient(runtimeConfig.public.authHost)).changePassword(data);
    close();
  }
}
const close = () => {
  dialogVisible.value = false;
  navigateTo('/');
}
</script>

<template>
  <Dialog :visible="dialogVisible" :header="formHeader()"  style="width: 24rem" position="center" @update:visible="close">
    <Form v-slot="$form" @submit="doChangePassword($form)">
      <Message v-if="errorMessage" severity="error">{{errorMessage}}</Message>
      <InputGroup>
        <InputGroupAddon>
          <label for="password">Пароль:</label>
        </InputGroupAddon>
        <Password name="password" type="password" :feedback="false"
                  variant="filled" :inputProps="{ autocomplete: 'off' }"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <label for="repeatPassword" type="password">Повторите пароль:</label>
        </InputGroupAddon>
        <Password name="repeatPassword" type="password" :feedback="false"
                  variant="filled" :inputProps="{ autocomplete: 'off' }"/>
      </InputGroup>
      <ButtonGroup>
        <Button label="Закрыть" icon="pi pi-close" severity="secondary" @click="close" raised/>
        <Button label="Сохранить" icon="pi pi-user" severity="info" size="small" @click="doChangePassword($form)" raised/>
      </ButtonGroup>
    </Form>
  </Dialog>
</template>
