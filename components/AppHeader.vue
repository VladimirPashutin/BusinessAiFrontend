<script setup lang="ts">
import LoginHandler from "~/components/LoginHandler.vue";

defineEmits(['toggleSidebar']);

</script>

<template>
  <Toolbar>
    <template #start>
      <img @click="$emit('toggleSidebar')" src="../public/favicon.ico" alt="t3t"/>
    </template>
    <template #center>
      <IconField>
        <InputIcon class="pi pi-search"/>
        <InputText placeholder="Search"/>
      </IconField>
    </template>
    <template #end>
      <LoginHandler/>
    </template>
  </Toolbar>
</template>
