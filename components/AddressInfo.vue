<script setup lang="ts">
import {ref,toRef} from "vue";

defineEmits(['update']);
const props = withDefaults(defineProps<{address: AddressObject,
      addressType?: string}>(), {addressType: 'Почтовый адрес'});
const addressType = toRef(props, "addressType");
const addressInfo = toRef(props, "address");
const candidates = ref([]);
const prepareCandidates = () => {
  // businessCommonClient.getAddressesFor(addressInfo.value).
  //                      then((value) => candidates.value = value === null ? [] : value.addressObject);
}
</script>

<template>
  <InputGroup>
    <InputGroupAddon>
      <label for="address">{{addressType}}</label>
    </InputGroupAddon>
    <InputText v-model="addressInfo.value" name="address" @change="$emit('update', addressInfo)"/>
  </InputGroup>
</template>
