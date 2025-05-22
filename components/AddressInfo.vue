<script setup lang="ts">
import {ref,toRef} from "vue";

defineEmits(['update']);
const props = withDefaults(defineProps<{address: AddressObject, addressType?: string}>(),
                               {addressType: 'Почтовый адрес'});
const addressType = toRef(props, "addressType");
const addressInfo = toRef(props, "address");
const candidates = ref([]);
const prepareCandidates = () => {
  // businessCommonClient.getAddressesFor(addressInfo.value).
  //                      then((value) => candidates.value = value === null ? [] : value.addressObject);
}
const header = () => {
  if(addressInfo.value === null) { return "Адрес не указан"; }
  return addressType.value + ": " + addressInfo.value;
}
let addressValue = addressInfo.value === null ? "" : addressInfo.value;
</script>

<template>
  <Fieldset :legend="header()" :toggleable="true">
    <AutoComplete v-model="addressValue" :suggestions="candidates"
                  @change="prepareCandidates" @complete="$emit('update', addressValue)"/>
  </Fieldset>
</template>
