<script setup lang="ts">
import {toRef} from "vue";

defineEmits(['update']);
const props = defineProps<{governance: Governance, orgName: string, orgId: string}>();
const governanceTypes = ["Директор", "Совет директоров", "Внешний управляющий", "Генеральный директор",
                         "Управляющая компания", "Индивидуальный предприниматель"];
const governance = toRef(props, 'governance');
const director = computed({
  get: () => { let result = "";
    for(let d of governance.value.directorIdList) {
      if(result.length !== 0) { result = result + ", "; }
      result = result + d;
    }
    return result;
  },
  set: newValue => {
    governance.value.directorIdList = newValue.split(",");
  }
})
</script>

<template>
  <div>
    <InputGroup>
      <InputGroupAddon>
        <label for="governance">Управляющий орган</label>
      </InputGroupAddon>
      <Select v-symbolModel="governance.kind" name="governance" :options="governanceTypes" style="max-width: 250px"
              placeholder="Укажите управляющий орган" @change="$emit('update', governance)" class="w-10"/>
      <InputText v-symbolModel="director" name="direct" @change="$emit('update', governance)"/>
    </InputGroup>
<!--    <InputGroup>-->
<!--      <FloatLabel variant="on">-->
<!--        <label for="start">Начало управления</label>-->
<!--        <DatePicker v-symbolModel="start" name="start" @update:symbolModel-value="updateDirection"/>-->
<!--      </FloatLabel>-->
<!--      <FloatLabel variant="on">-->
<!--        <label for="end">Окончание управления</label>-->
<!--        <DatePicker v-symbolModel="end" name="end" @update:symbolModel-value="updateDirection"/>-->
<!--      </FloatLabel>-->
<!--    </InputGroup>-->
  </div>
</template>
