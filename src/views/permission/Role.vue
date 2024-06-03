<script setup lang="ts">
import roleApi from '@/api/role-api';
import { ref, onMounted } from 'vue';
import type { IRoleData } from '@/interface/IRole';

const rolesList = ref<IRoleData[]>([]);

async function doGetRoles() {
  const result = await roleApi.getRoles();
  rolesList.value = result.items;
}

onMounted(() => {
  doGetRoles();
});
</script>

<template>
  <div class="card">
    <PrimeButton severity="secondary"></PrimeButton>

    <PrimeDataTable :value="rolesList">
      <PrimeColumn field="key" header="Role Key"></PrimeColumn>
      <PrimeColumn field="name" header="Role Name"></PrimeColumn>
      <PrimeColumn field="description" header="Description"></PrimeColumn>
      <PrimeColumn header="Operations">
        <template #body>
          <div class="flex gap-2">
            <PrimeButton label="edit" type="button" severity="primary" size="small"></PrimeButton>
            <PrimeButton label="delete" type="button" severity="danger" size="small"></PrimeButton>
          </div>
        </template>
      </PrimeColumn>
    </PrimeDataTable>

    <PrimeDialog>
      <PrimeInput></PrimeInput>
      <PrimeInput></PrimeInput>
    </PrimeDialog>
  </div>
</template>

<style lang="scss" scoped></style>
