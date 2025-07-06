<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import {BusinessAiControllerClient} from "~/utils/apiQueries.ts"
import {ApiHttpClient, newOrganization} from "~/utils/clientProvider.ts";

const selectedOrganization = ref(null as string | null);

const selectOrganization = (name: string) => {
  selectedOrganization.value = name;
  navigateTo("/");
}

const getOrgName = (): string => {
  if(selectedOrganization.value === null) {
    const {user} = useUserSession();
    if(user.value?.communities === undefined || user.value?.communities.length === 0)
    { return "Организация не указана"} else { return user.value.communities[0]; }
  } else { return selectedOrganization.value; }
}

const navigateToHome = async () => {
  await navigateTo("/");
}

const showMainMenu = () => {
  const {loggedIn} = useUserSession();
  return loggedIn.value;
}

const mainMenuItems = ref([
  {
    label: 'Данные организации',
    icon: 'pi pi-building-columns',
    command: async ()  => {
      navigateTo('/organization/' + getOrgName())
    }
  },
  {
    label: 'Лицевой счёт',
    icon: 'pi pi-money-bill',
    command: async ()  => {
      navigateTo('/account/' + getOrgName())
    }
  },
  {
    label: 'Номенклатура продукции/услуг',
    icon: 'pi pi-gift',
    command: async ()  => {
      navigateTo('/assortment/' + getOrgName());
    }
  },
  {
    label: 'Отзывы',
    icon: 'pi pi-megaphone',
    command: async () => {
      navigateTo('/reviews/' + getOrgName());
    }
  },
  {
    label: 'Публикации',
    icon: 'pi pi-book',
    command: async () => {
      navigateTo('/publications/' + getOrgName());
    }
  }
])
</script>

<template>
  <div>
    <AppHeader @navigate-to-home="navigateToHome" @setOrgName="selectOrganization"/>
    <div style="min-height: 90svh" class="flex">
      <Menu class="basis-1/4 h-full" v-if="showMainMenu()" :model="mainMenuItems"/>
      <slot class="basis-3/4 h-full"/>
    </div>
  </div>
</template>
