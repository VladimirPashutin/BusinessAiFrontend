<script setup lang="ts">
import {makeCredentialsFromData} from "~/utils/login.d.ts";
import {RegistrationHttpClient} from "~/utils/clientProvider.ts";
import {AuthRegistrationControllerClient} from "~/utils/apiQueries.ts"

const registrationClient = new AuthRegistrationControllerClient(new RegistrationHttpClient());

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
    await registrationClient.changePassword(data);
    close();
  }
}
const close = () => {
  dialogVisible.value = false;
}
</script>

<template>
  <Dialog :visible="dialogVisible" :header="formHeader()"  style="width: 24rem" position="center" @update:visible="close">
    <Form v-slot="$form" @submit="doChangePassword($form)" class="flex flex-col w-full">
      <Message v-if="errorMessage" severity="error">{{errorMessage}}</Message>
      <InputGroup>
        <InputGroupAddon>
          <label for="password" class="font-semibold">Пароль:</label>
        </InputGroupAddon>
        <Password name="password" type="password" :feedback="false"
                  variant="filled" :inputProps="{ autocomplete: 'off' }"/>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <label for="repeatPassword" type="password" class="font-semibold">Повторите пароль:</label>
        </InputGroupAddon>
        <Password name="repeatPassword" type="password" :feedback="false"
                  variant="filled" :inputProps="{ autocomplete: 'off' }"/>
      </InputGroup>
      <ButtonGroup class="flex justify-end gap-2">
        <Button label="Закрыть" icon="pi pi-close" severity="secondary" @click="close" raised/>
        <Button label="Сохранить" icon="pi pi-user" severity="info" size="small" @click="doChangePassword($form)" raised/>
      </ButtonGroup>
    </Form>
  </Dialog>
</template>
