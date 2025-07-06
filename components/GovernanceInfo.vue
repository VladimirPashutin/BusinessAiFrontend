<script setup lang="ts">
import {ref, toRef, onMounted} from "vue";

const emits = defineEmits(['update']);
const props = defineProps<{governance: Governance, orgName: string, orgId: string}>();
const governanceTypes = ["Директор", "Совет директоров", "Внешний управляющий", "Генеральный директор",
                         "Управляющая компания", "Индивидуальный предприниматель"];
const governance = toRef(props, 'governance');
const start = ref();
const end = ref();
const director = ref("");
const updateDirection = () => {
  governance.value.director = director.value.split(",");
  governance.value.organization = new OrganizationRef({ id: props.orgId, value: props.orgName });
  governance.value.start = start.value;
  governance.value.end = end.value;
  emits('update', governance);
}
onMounted(() => {
  // if(governance.value !== null && governance.value !== undefined) {
  //   if(governance.value.start !== null && governance.value.start !== undefined)
  //   { start.value = governance.value.start; }
  //   if(governance.value.end !== null && governance.value.end !== undefined)
  //   { end.value = governance.value.end; }
  // }
})
</script>

<template>
  <div>
    <InputGroup>
      <InputGroupAddon>
        <label for="governance">Управляющий орган</label>
      </InputGroupAddon>
      <Select v-model="governance.kind" name="governance" :options="governanceTypes" style="max-width: 250px"
              placeholder="Укажите управляющий орган" @change="updateDirection" class="w-10"/>
      <InputText v-model="director" name="direct" @change="updateDirection"/>
    </InputGroup>
<!--    <InputGroup>-->
<!--      <FloatLabel variant="on">-->
<!--        <label for="start">Начало управления</label>-->
<!--        <DatePicker v-model="start" name="start" @update:model-value="updateDirection"/>-->
<!--      </FloatLabel>-->
<!--      <FloatLabel variant="on">-->
<!--        <label for="end">Окончание управления</label>-->
<!--        <DatePicker v-model="end" name="end" @update:model-value="updateDirection"/>-->
<!--      </FloatLabel>-->
<!--    </InputGroup>-->
  </div>
</template>
