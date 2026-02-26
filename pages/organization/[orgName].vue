<script setup lang="ts">
import {ref, onMounted} from "vue";
import {type Organization} from "~/utils/apiQueries.ts";
import {newBankDetails, newOrganization, getCommonClient} from "~/utils/clientProvider.ts";

const route = useRoute();
const needUpdate = ref(false);
const organization = ref(newOrganization());

const updateOrganizationInfo = async (org: Organization) => {
  organization.value = org;
  needUpdate.value = true;
}

const saveUpdatedOrganization = async () => {
  await getCommonClient().saveOrganization(organization.value);
  needUpdate.value = false;
}

onMounted(() => {
  getCommonClient().getOrganizationByName(<string>route.params.orgName).then((value) => {
    if(value !== null && value !== undefined) { organization.value = value; }
    else { organization.value = newOrganization();
      organization.value.fullOrganizationName = <string>route.params.orgName;
      organization.value.strictOrgName = <string>route.params.orgName;
    }
    if(organization.value.bankDetails === null || organization.value.bankDetails.length === 0)
    { organization.value.bankDetails = newBankDetails(organization.value.id, "Основной расчётный счёт"); }
    if(organization.value.contacts === null || organization.value.contacts.length === 0) {
      organization.value.contacts = [new ContactInfo({
        kind: "email",
        value: ""
      })]
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
