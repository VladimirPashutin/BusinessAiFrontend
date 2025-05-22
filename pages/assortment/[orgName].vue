<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ApiHttpClient} from "~/utils/clientProvider.ts";
import AssortmentInfo from "~/components/AssortmentInfo.vue";
import {type Assortment, CommonDataControllerClient} from "~/utils/apiQueries.ts";

const route = useRoute();
const organizationId = ref(null as string);
const assortments = ref([] as Assortment[]);

onMounted(async () => {
  const commonClient = new CommonDataControllerClient(new ApiHttpClient());
  const organization = await commonClient.getOrganization(<string>route.params.orgName);
  assortments.value = await commonClient.getAssortmentList(organization.id);
  organizationId.value = organization.id;
});

const updateAssortmentInfo = (assortment: Assortment) => {
  const commonClient = new CommonDataControllerClient(new ApiHttpClient());
  commonClient.saveAssortment(organizationId.value, assortment);
}

const addAssortment = () => {

}
</script>

<template>
  <div class="flex flex-column gap-2 w-full">
    <Toolbar class="gap-2">
      <template #center>
        <h3>Откорректируйте список ваших товаров или услуг</h3>
      </template>
      <template #end>
        <Button @click="addAssortment">Добавить</Button>
      </template>
    </Toolbar>
    <Fieldset v-for="assortment in assortments" :legend="assortment.name" toggleable collapsed>
      <AssortmentInfo :assortment="assortment" @update="updateAssortmentInfo"/>
    </Fieldset>
  </div>
</template>
