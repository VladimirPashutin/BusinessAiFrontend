<script setup lang="ts">
import {ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import OrganizationInfo from "~/components/OrganizationInfo.vue";
import {type Organization, CommonDataControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const needUpdate = ref(false);
const organization = ref(null as Organization);

const updateOrganizationInfo = async (org: Organization) => {
  organization.value = org;
  needUpdate.value = true;
}

const saveUpdatedOrganization = async () => {
  console.log('Обновление данных по организации', organization.value.strictOrgName)
  const client = new CommonDataControllerClient(new ApiHttpClient());
  await client.saveOrganization(organization.value);
  needUpdate.value = false;
}
</script>

<template>
  <div class="flex flex-column gap-2 w-full">
    <Toolbar class="gap-2">
      <template #center>
        <h3>Уточните данные по вашей организации</h3>
      </template>
      <template #end>
        <Button v-if="needUpdate" @click="saveUpdatedOrganization">Сохранить изменения</Button>
      </template>
    </Toolbar>
    <OrganizationInfo :org-name="<string>route.params.orgName" @update="updateOrganizationInfo"/>
  </div>
</template>
