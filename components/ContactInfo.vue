<script setup lang="ts">
import {toRef} from "vue";

const emits = defineEmits(['update']);
const props = defineProps<{contact: ContactInfo}>();
const contactTypes = ["email", "Телефон", "Telegram"];
const contact = toRef(props, 'contact');
</script>

<template>
  <InputGroup class="gap-2">
    <InputGroupAddon>
      <label for="contactKind">Контактные данные</label>
    </InputGroupAddon>
    <Select v-model="contact.kind" name="contactKind" style="max-width: 150px"
            :options="contactTypes"  @change="$emit('update', contact)"/>
    <InputText v-model="contact.value" name="contactValue"
               @change="$emit('update', contact)"/>
  </InputGroup>
</template>
