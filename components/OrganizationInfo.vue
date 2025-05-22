<script setup lang="ts">
import {onMounted, ref} from "vue";
import AddressInfo from "~/components/AddressInfo.vue";
import {CommonDataControllerClient} from "~/utils/apiQueries.ts";
import {ApiHttpClient, newOrganization} from "~/utils/clientProvider.ts"

defineEmits(['update']);
const props = defineProps<{orgName: string}>();
const organization = ref(newOrganization());

onMounted(() => {
  const client = new CommonDataControllerClient(new ApiHttpClient());
  client.getOrganization(props.orgName).then((value) => organization.value = value);
});

</script>

<template>
  <div class="flex flex-column gap-2 w-full">
    <InputGroup>
      <InputGroupAddon>
        <label>Полное наименование организации</label>
      </InputGroupAddon>
      <InputText v-model="organization.fullOrganizationName"
                 @change="$emit('update', organization)"/>
    </InputGroup>
    <InputGroup class="gap-2">
      <InputGroupAddon>
        <label>ИНН</label>
      </InputGroupAddon>
      <InputText v-model="organization.inn"
                 @change="$emit('update', organization)"/>
      <InputGroupAddon>
        <label>ОКФС</label>
      </InputGroupAddon>
      <InputText v-model="organization.okfs"
                 @change="$emit('update', organization)"/>
    </InputGroup>
    <InputGroup class="gap-2">
      <InputGroupAddon>
        <label>ОГРН</label>
      </InputGroupAddon>
      <InputText v-model="organization.ogrn"
                 @change="$emit('update', organization)"/>
      <InputGroupAddon>
        <label>ОКПО</label>
      </InputGroupAddon>
      <InputText v-model="organization.okpo"
                 @change="$emit('update', organization)"/>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <label>Юридический адрес</label>
      </InputGroupAddon>
      <InputText v-model="organization.lowAddress.value"
                 @change="$emit('update', organization)"/>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <label>Почтовый адрес</label>
      </InputGroupAddon>
      <InputText v-model="organization.postAddress.value"
                 @change="$emit('update', organization)"/>
    </InputGroup>
  </div>
</template>
