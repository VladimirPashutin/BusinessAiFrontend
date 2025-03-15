<script setup lang="ts">
import {toRef} from "vue";
import AddressInfo from "~/components/AddressInfo.vue";

defineEmits(['update']);
const props = defineProps<{organization: Organization}>();
const organizationInfo = toRef(props, 'organization');
let organization = organizationInfo.value === null ? {
        fullOrganizationName: "Организация не указана",
        strictOrgName: "Организация не указана",
        postAddress: "Адрес не указан",
        lowAddress: "Адрес не указан",
        OKPO: "",
        OGRN: "",
        INN: ""
    } : organizationInfo.value;
</script>

<template>
  <Panel :header="organization.strictOrgName" toggleable>
    <InputGroup>
      <InputGroupAddon>
        <label>Полное наименование организации</label>
      </InputGroupAddon>
      <InputText v-model="organization.fullOrganizationName"
                 @change="$emit('update', 'fullOrganizationName', organization.fullOrganizationName)"/>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <label>ИНН</label>
      </InputGroupAddon>
      <InputText v-model="organization.INN"
                 @change="$emit('update', 'INN', organization.INN)"/>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <label>ОГРН</label>
      </InputGroupAddon>
      <InputText v-model="organization.OGRN"
                 @change="$emit('update', 'OGRN', organization.OGRN)"/>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <label>ОКПО</label>
      </InputGroupAddon>
      <InputText v-model="organization.OKPO"
                 @change="$emit('update', 'OKPO', organization.OKPO)"/>
    </InputGroup>
    <AddressInfo :address="organization.lowAddress" address-type="Юридический адрес"
                 @update="$emit('update', 'lowAddress', organization.lowAddress)"/>
    <AddressInfo :address="organization.postAddress" address-type="Почтовый адрес"
                 @update="$emit('update', 'postAddress', organization.postAddress)"/>
  </Panel>
</template>
