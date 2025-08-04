<script setup lang="ts">
import {ref, onMounted} from "vue";

const orgId = ref();
const route = useRoute();
const needUpdate = ref(false);

const saveAccountData = () => {

}

const updateAccountInfo = () => {

};

onMounted(() => {
});
</script>

<template>
  <div class="w-full">
    <Toolbar>
      <template #center>
        <h3>Ваши заказы и текущий баланс</h3>
      </template>
      <template #end>
        <Button v-if="needUpdate" @click="saveAccountData">Сохранить изменения</Button>
      </template>
    </Toolbar>
    <AccountInfo :org-id="orgId" @update="updateAccountInfo"/>
  </div>
</template>
