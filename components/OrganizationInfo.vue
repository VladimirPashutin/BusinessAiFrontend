<script setup lang="ts">
import {toRef} from "vue";

const emits = defineEmits(['update']);
const props = defineProps<{organization: Organization}>();
const organization = toRef(props, 'organization');
</script>

<template>
  <div class="flex-row">
    <InputGroup>
      <InputGroupAddon>
        <label>Полное наименование организации</label>
      </InputGroupAddon>
      <InputText v-model="organization.fullOrganizationName"
                 @change="$emit('update', organization)"/>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <label for="inn">ИНН</label>
      </InputGroupAddon>
      <InputText v-model="organization.inn" name="inn"
                 @change="$emit('update', organization)"/>
      <InputGroupAddon>
        <label for="ogrn">ОГРН</label>
      </InputGroupAddon>
      <InputText v-model="organization.ogrn" name="ogrn"
                 @change="$emit('update', organization)"/>
      <InputGroupAddon>
        <label for="okved">ОКВЭД</label>
      </InputGroupAddon>
      <InputText v-model="organization.okved" name="okved"
                 @change="$emit('update', organization)"/>
    </InputGroup>
    <GovernanceInfo :governance="organization.governance" :org-name="organization.strictOrgName"
                    :org-id="organization.id" @update="$emit('update', organization)"/>
    <InputGroup>
      <AddressInfo address-type="Юридический адрес" :address="organization.lowAddress" form-name="lowAddress"
                   @update="$emit('update', organization)"/>
      <AddressInfo address-type="Почтовый адрес" :address="organization.postAddress" form-name="postAddress"
                   @update="$emit('update', organization)"/>
    </InputGroup>
    <Fieldset v-for="bankDetails in organization.bankDetails" :legend="bankDetails.name">
      <BankInfo :bank-details="bankDetails" :org-id="organization.id" @update="$emit('update', organization)"/>
    </Fieldset>
    <div v-for="contact in organization.contacts">
      <ContactInfo :contact="contact" @update="$emit('update', organization)"/>
    </div>
  </div>
</template>
