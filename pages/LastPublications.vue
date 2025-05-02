<script setup lang="ts">

</script>

<template>
  <div class="details-table">
    <DataTable :value="publications" scrollable table-style="min-width: 100rem"
               :virtual-scroller-options="{ lazy: true, onLazyLoad: loadPublications, showLoader: true, loading: processLoading}">

    </DataTable>
  </div>
</template>
