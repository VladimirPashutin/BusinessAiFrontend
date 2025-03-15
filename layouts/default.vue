<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";

const showMainMenu = ref(true);

const toggleMainMenu = () => {
  showMainMenu.value = !showMainMenu.value;
  console.log("Switch menu to", showMainMenu.value);
}
const mainMenuItems = ref([
  {
    label: 'Профиль',
    icon: 'pi pi-building-columns',
    command: ()  => {
      navigateTo('/profile')
    }
  },
  {
    label: 'Публикации',
    items: [
      {
        label: 'Список последних',
        command: () => { navigateTo('/lastpublications')}
      },
      {
        label: 'Запланировать публикацию',
        icon: 'pi pi-file-plus',
        command: () => { navigateTo('/newpublication')}
      }
    ]
  },
  {
    label: 'Ответы на отзывы',
    items: [
      {
        label: 'Список последних',
        command: () => { navigateTo('/lastreviews')}
      },
      {
        label: 'Список шаблонов',
        command: () => { navigateTo('/templates')}
      },
      {
        label: 'Добавить шаблон',
        icon: 'pi pi-file-plus',
        command: () => { navigateTo('/newtemplate')}
      }
    ]
  }
])
</script>

<template>
  <div class="px-4">
    <AppHeader @toggle-sidebar="toggleMainMenu"/>
    <div class="flex flex-row flex-nowrap">
      <Menu class="h-auto" v-if="showMainMenu" :model="mainMenuItems"/>
      <slot />
    </div>
  </div>
</template>
