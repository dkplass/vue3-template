<script setup lang="ts">
import ProductsApi from '@/api/products-api';
import axios from 'axios';
import { onMounted } from 'vue';
import { config } from 'process';

async function getProducts() {
  const r = await ProductsApi.getProducts();
  console.log(r);
}

onMounted(async () => {
  axios
    .get('http://localhost:9090/products', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
    .then((response) => {
      console.log(response);
    });

  // fetch('http://localhost:9090/products')
  //   .then((response) => response.json())
  //   .then((data: any) => {
  //     console.log(data);
  //   });

  // getProducts();
});
</script>

<template>Dashboard</template>
