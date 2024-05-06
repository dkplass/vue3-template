<script setup lang="ts">
import AppConfig from '@/layout/AppConfig.vue';
import { useLayout } from '@/layout/composables/layout';
import { useUserProfileStore } from '@/stores/userProfile';
import { ref, computed, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { layoutConfig } = useLayout();

const userProfileStore = useUserProfileStore();

const router = useRouter();

const route = useRoute();

const loginForm = reactive<{ userName: string; password: string }>({
  userName: '',
  password: ''
});

const checked = ref<boolean>(false);

const redirect = ref<string | undefined>();

const otherQuery: GenericObject<string> = {};

const logoUrl = computed(() => {
  return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

async function handleLogin() {
  await userProfileStore.doLogin({ username: loginForm.userName, password: loginForm.password });

  router
    .push({
      path: redirect.value || '/',
      query: otherQuery
    })
    .catch((err) => {
      console.warn(err);
    });
}

watch(
  () => route.query,
  (newVal) => {
    if (newVal.redirect) {
      redirect.value = newVal.redirect as string;
    }
  }
);
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div>
            <label for="userName" class="block text-900 text-xl font-medium mb-2">UserName</label>
            <PrimeInputText
              id="userName"
              v-model="loginForm.userName"
              type="text"
              placeholder="Email address"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
            />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <PrimePassword
              id="password1"
              v-model="loginForm.password"
              placeholder="Password"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
              :input-style="{ padding: '1rem' }"
            ></PrimePassword>

            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <div class="flex align-items-center">
                <PrimeCheckbox
                  id="rememberme1"
                  v-model="checked"
                  binary
                  class="mr-2"
                ></PrimeCheckbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >Forgot password?</a
              >
            </div>
            <PrimeButton
              label="Sign In"
              class="w-full p-3 text-xl"
              @click="handleLogin"
            ></PrimeButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AppConfig simple />
</template>

<style lang="scss" scoped></style>
