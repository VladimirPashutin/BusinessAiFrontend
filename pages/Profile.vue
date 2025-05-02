<script setup lang="ts">
import {onMounted,ref} from "vue";
import OrganizationInfo from "~/components/OrganizationInfo.vue";

let organization = null;
let clientData = "Нет информации";
onMounted(async () => {
  // clientData = loginStore.userInfo.name;
  // organization = await adminClient.getRegistrationInfo();
})
const updateOrganizationInfo = () => {
  console.log('Обновление данных по организации', organization)
}
</script>

<template>
  <div>
    <Fieldset :legend="clientData" toggleable>
      <OrganizationInfo :organization="<Organization>organization" @update="updateOrganizationInfo()"/>
    </Fieldset>
  </div>
</template>
