<script setup lang="ts">
import {ref, onMounted} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import {AuthRegistrationControllerClient} from "~/utils/apiQueries.ts"

const route = useRoute();

const dialogVisible = ref(true);
const registrationAccepted = ref(false);

const formHeader = () => {
  return "Подтверждение регистрации"
}

const close = () => {
  dialogVisible.value = false;
  navigateTo('/');
}

onMounted( async () => {
  const runtimeConfig = useRuntimeConfig()
  registrationAccepted.value = await new AuthRegistrationControllerClient(new ApiHttpClient(runtimeConfig.app.authHost)).
                               acceptRegistration(route.params.id);
})
</script>

<template>
  <Dialog :visible="dialogVisible" :header="formHeader()"
          style="width: 24rem" position="center" @update:visible="close">
    <h3 v-if="registrationAccepted">Вы подтвердили регистрацию в системе и можете начинать полноценную работу в личном кабинете</h3>
    <h3 v-if="!registrationAccepted">Подтверждение Вашей регистрации потерпело неудачу, возможно вы слишком долго не переходили по указанной ссылке. Для получения возможности работы в системе обратитесь в техническую поддержку.</h3>
  </Dialog>
</template>
