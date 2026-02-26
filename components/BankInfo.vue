<script setup lang="ts">
import {onMounted, toRef} from "vue";

const emits = defineEmits(['update']);
const props = defineProps<{bankDetails: BankingDetails, orgId: string}>();
const bankDetails = toRef(props, 'bankDetails');
onMounted(() => {
  bankDetails.value.ownerId = props.orgId;
})
</script>

<template>
  <div>
    <InputGroup>
      <InputGroupAddon>
        <label for="bankName">Наименование банка</label>
      </InputGroupAddon>
      <InputText v-model="bankDetails.bankName" name="bankName"
                 @change="$emit('update', bankDetails)"/>
    </InputGroup>
    <InputGroup>
     <FloatLabel variant="on">
        <label for="bik">БИК банка</label>
        <InputText v-model="bankDetails.bik" name="bik"
                   @change="$emit('update', bankDetails)"/>
      </FloatLabel>
      <FloatLabel variant="on">
        <label for="innBank">ИНН банка</label>
        <InputText v-model="bankDetails.inn" name="innBank"
                   @change="$emit('update', bankDetails)"/>
      </FloatLabel>
      <FloatLabel variant="on">
        <label for="kpp">КПП банка</label>
        <InputText v-model="bankDetails.kpp" name="kpp"
                   @change="$emit('update', bankDetails)"/>
      </FloatLabel>
    </InputGroup>
    <InputGroup>
      <FloatLabel variant="on">
        <label for="correspond">Корреспондентский счёт банка</label>
        <InputText v-model="bankDetails.correspond" name="correspond"
                   @change="$emit('update', bankDetails)"/>
      </FloatLabel>
      <FloatLabel variant="on">
        <label for="account">Расчётный счёт</label>
        <InputText v-model="bankDetails.account" name="account"
                   @change="$emit('update', bankDetails)"/>
      </FloatLabel>
    </InputGroup>
  </div>
</template>
