<script setup lang="ts">
import {ref} from "vue";
import LoginHandler from "~/components/LoginHandler.vue";

defineEmits(['navigateToHome', 'setOrgName']);

const organizationList = () => {
  const {loggedIn, user} = useUserSession();
  if(loggedIn.value) {
    return user.value.communities;
  } else {
    return [] as string[];
  }
}

const organizationCount = () => {
  return organizationList().length;
}

const organizationName = ref(null as string);
</script>

<template>
  <Toolbar class="gap-2">
    <template #start>
      <img @click="$emit('navigateToHome')" src="../public/favicon.ico" alt="t3t"/>
    </template>
    <template #center>
      <IconField>
        <InputIcon name="seach-icon" class="pi pi-search"/>
        <InputText name="search" placeholder="Поиск"/>
      </IconField>
    </template>
    <template #end>
      <Select v-if="organizationCount() > 1" v-model="organizationName" :options="organizationList()"
              @update:modelValue="$emit('setOrgName', organizationName)"
              placeholder="Выберите организацию для работы"/>
      <Divider v-if="organizationCount() > 1" layout="vertical" />
      <LoginHandler/>
    </template>
  </Toolbar>
</template>
