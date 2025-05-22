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
    return user.value.communities[0];
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
    label: 'Профиль компании',
    items: [
      {
        label: 'Данные организации',
        icon: 'pi pi-building-columns',
        command: async ()  => {
          navigateTo('/organization/' + getOrgName())
        }
      },
      {
        label: 'Номенклатура продукции/услуг',
        icon: 'pi pi-gift',
        command: async ()  => {
          navigateTo('/assortment/' + getOrgName());
        }
      }
    ]
  },
  {
    label: 'Журнал',
    items: [
      {
        label: 'Отзывы',
        items: [
          {
            label: 'Обработанные',
            icon: 'pi pi-megaphone',
            command: async () => {
              navigateTo('/reviews/' + getOrgName());
            }
          },
          {
            label: 'Инциденты',
            icon: 'pi pi-thumbs-down',
            command: async () => {
              navigateTo('/incidents/' + getOrgName());
            }
          }
        ]
      },
      {
        label: 'Публикации',
        icon: 'pi pi-book',
        command: async () => {
          navigateTo('/publications/' + getOrgName());
        }
      }
    ]
  },
  {
    label: 'Настройки',
    items: [
      {
        label: 'Режим публикаций',
        icon: 'pi pi-receipt',
        command: async () => {
          navigateTo('/publications-plan/' + getOrgName());
        }
      },
      {
        label: 'Стратегия формирования отзывов',
        icon: 'pi pi-receipt',
        command: async () => {
          navigateTo('/reviews-plan/' + getOrgName());
        }
      }
    ]
  }
])
</script>

<template>
  <div class="px-4">
    <AppHeader @navigate-to-home="navigateToHome" @setOrgName="selectOrganization"/>
    <div class="flex flex-row flex-nowrap">
      <Menu class="h-auto" v-if="showMainMenu()" :model="mainMenuItems"/>
      <slot />
    </div>
  </div>
</template>
