<script setup lang="ts">
import ProductsApi from '@/api/products-api';
import { useLayout } from '@/layout/composables/layout';
import Menu from 'primevue/menu';
import { onMounted, reactive, ref, watch } from 'vue';
import type { IProduct } from '@/interface/IProduct';

const { isDarkTheme } = useLayout();

const menu1 = ref<Menu>();

const menu2 = ref<Menu>();

const products = ref<IProduct[]>([]);

const categories = ref<Record<string, any>[]>([
  {
    item: 'Space T-Shirt',
    category: 'Clothing',
    length: '50%',
    lengthLabel: '%50',
    color: 'orange'
  },
  {
    item: 'Portal Sticker',
    category: 'Accessory',
    length: '16%',
    lengthLabel: '%16',
    color: 'cyan'
  },
  {
    item: 'Supernova Sticker',
    category: 'Accessory',
    length: '67%',
    lengthLabel: '%67',
    color: 'pink'
  },
  {
    item: 'Wonder Notebook',
    category: 'Office',
    length: '35%',
    lengthLabel: '%35',
    color: 'green'
  },
  {
    item: 'Mat Black Case',
    category: 'Accessory',
    length: '75%',
    lengthLabel: '%75',
    color: 'purple'
  },
  {
    item: 'Robots T-Shirt',
    category: 'Clothing',
    length: '40%',
    lengthLabel: '%40',
    color: 'teal'
  }
]);

const lineData = reactive<{ labels: string[]; datasets: Record<string, any>[] }>({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4
    }
  ]
});

const items = ref<{ label: string; icon: string }[]>([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);

const lineOptions = ref<Record<string, any> | null>(null);

async function doGetProductsSmall() {
  const result = await ProductsApi.getProductsSmall();
  products.value = result;
}

function formatCurrency(value: any) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function applyLightTheme() {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };
}

function applyDarkTheme() {
  lineOptions.value = {
    plugins: {
      legend: {
        labels: {
          color: '#ebedef'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      },
      y: {
        ticks: {
          color: '#ebedef'
        },
        grid: {
          color: 'rgba(160, 167, 181, .3)'
        }
      }
    }
  };
}

onMounted(() => {
  doGetProductsSmall();
});

watch(
  isDarkTheme,
  (val) => {
    if (val) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Orders</span>
            <div class="text-900 font-medium text-xl">152</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
          <span class="text-green-500 font-medium">24 new</span>
          <span class="text-500">since last visit</span>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Revenue</span>
            <div class="text-900 font-medium text-xl">$2.100</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">%52+ </span>
        <span class="text-500">since last week</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Customers</span>
            <div class="text-900 font-medium text-xl">28441</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">520 </span>
        <span class="text-500">newly registered</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Comments</span>
            <div class="text-900 font-medium text-xl">152 Unread</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">85 </span>
        <span class="text-500">responded</span>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Recent Sales</h5>
        <PrimeDataTable :value="products" :rows="5" :paginator="true" reponsive-layout="scroll">
          <PrimeColumn style="width: 15%">
            <template #header>Image</template>
            <template #body="slotProps">
              <img
                :src="`demo/images/product/${slotProps.data.image}`"
                :alt="slotProps.data.image"
                width="50"
                class="shadow-2"
              />
            </template>
          </PrimeColumn>
          <PrimeColumn field="name" header="Name" :sortable="true" style="width: 35%"></PrimeColumn>
          <PrimeColumn field="price" header="Price" :sortable="true" style="width: 35%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </PrimeColumn>
          <PrimeColumn style="width: 15%">
            <template #header>View</template>
            <template #body>
              <PrimeButton icon="pi pi-search" type="button" class="p-button-text"></PrimeButton>
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </div>
      <div class="card">
        <div class="flex justify-content-between align-items-center mb-5">
          <h5>Best Selling Products</h5>
          <div>
            <PrimeButton
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="menu2!.toggle($event)"
            ></PrimeButton>
            <PrimeMenu ref="menu2" :popup="true" :model="items"></PrimeMenu>
          </div>
        </div>
        <ul class="list-none p-0 m-0">
          <li
            v-for="(category, index) in categories"
            :key="index"
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ category.item }}</span>
              <div class="mt-1 text-600">{{ category.category }}</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <div
                  :class="`bg-${category.color}-500`"
                  class="h-full"
                  :style="{ width: category.length }"
                ></div>
              </div>
              <span :class="`text-${category.color}-500`" class="ml-3 font-medium">
                {{ category.lengthLabel }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Sales Overview</h5>
        <PrimeChart type="line" :data="lineData" :options="lineOptions" />
      </div>
      <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Notifications</h5>
          <div>
            <PrimeButton
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="menu1!.toggle($event)"
            ></PrimeButton>
            <PrimeMenu ref="menu1" :popup="true" :model="items"></PrimeMenu>
          </div>
        </div>
        <span class="block text-600 font-medium mb-3">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3">
              Richard Jones
              <span class="text-700">
                has purchased a blue t-shirt for
                <span class="text-blue-500">79$</span>
              </span>
            </span>
          </li>
          <li class="flex align-items-center py-2">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-download text-xl text-orange-500"></i>
            </div>
            <span class="text-700 line-height-3">
              Your request for withdrawal of
              <span class="text-blue-500 font-medium">2500$</span>
              has been initiated.
            </span>
          </li>
        </ul>

        <span class="block text-600 font-medium mb-3">YESTERDAY</span>
        <ul class="p-0 m-0 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3"
              >Keyser Wick
              <span class="text-700">
                has purchased a black jacket for
                <span class="text-blue-500">59$</span>
              </span>
            </span>
          </li>
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-question text-xl text-pink-500"></i>
            </div>
            <span class="text-900 line-height-3">
              Jane Davis
              <span class="text-700">has posted a new questions about your product.</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
