<script setup lang="ts">
import {v4 as uuidv4} from "uuid";
import {ref, onMounted} from "vue";
import {ApiHttpClient, newOrganization} from "~/utils/clientProvider.ts";
import {type Organization, CommonDataControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const needUpdate = ref(false);
const organization = ref(newOrganization());

const updateOrganizationInfo = async (org: Organization) => {
  organization.value = org;
  needUpdate.value = true;
}

const saveUpdatedOrganization = async () => {
  const runtimeConfig = useRuntimeConfig();
  console.log('Обновление данных по организации', organization.value.strictOrgName)
  const client = new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  await client.saveOrganization(organization.value);
  needUpdate.value = false;
}

onMounted(() => {
  const runtimeConfig = useRuntimeConfig();
  const client = new CommonDataControllerClient(new ApiHttpClient(runtimeConfig.app.businessHost));
  client.getOrganizationByName(<string>route.params.orgName).then((value) => {
    if(value !== null && value !== undefined) {
      organization.value = value;
    } else { organization.value.fullOrganizationName = <string>route.params.orgName;
      organization.value.strictOrgName = <string>route.params.orgName;
      organization.value.id = uuidv4();
    }
    if(organization.value.bankDetails === null || organization.value.bankDetails.length === 0) {
      organization.value.bankDetails = [new BankingDetails({
        name: "Основной расчётный счёт",
        ownerId: organization.value.id,
        correspond: "",
        bankName: "",
        account: "",
        kpp: "",
        inn: "",
        bik: ""
      })]
      needUpdate.value = true;
    }
    if(organization.value.contacts === null || organization.value.contacts.length === 0) {
      organization.value.contacts = [new ContactInfo({
        kind: "email",
        value: ""
      })]
      needUpdate.value = true;
    }
  });
});
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Уточните данные по вашей организации</h3>
      </template>
      <template #end>
        <Button v-if="needUpdate" @click="saveUpdatedOrganization">Сохранить изменения</Button>
      </template>
    </Toolbar>
    <OrganizationInfo :organization="organization" @update="updateOrganizationInfo"/>
  </div>
</template>
