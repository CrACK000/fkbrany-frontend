<script setup lang="ts">
import { FwbButton, FwbInput } from "flowbite-vue";
import axios from "axios";
import {inject, ref} from "vue";
import router from "@/router";
import {useMeta} from "vue-meta";
import Header from "@/components/Header.vue";
import Footer from "@/views/layout/Footer.vue";

useMeta({ title: "Login" })

const auth = inject<any>('auth');

const form = ref<any>({
  username: '' as string,
  password: '' as string,
});

const loading = ref<boolean>(false);
const error = ref<boolean>(false);

const login = async () => {

  // check valid
  if (!form.value.username) return
  if (!form.value.password) return

  error.value = false;
  loading.value = true;

  await axios.post(`${import.meta.env.VITE_BACKEND}/login`, form.value, { withCredentials: true })
    .then(response => {
      if (response.data.success) {
        auth.loggedIn.value = response.data.loggedIn
        auth.userData.value = response.data.user
        router.push({ name: 'dashboard' })
      } else {
        error.value = true;
      }
    })
    .catch(err => {
      error.value = true
    })
    .finally(() => {
      form.value.password = ''
      loading.value = false;
    });
}

</script>

<template>
  <Header>
    <form @submit.prevent="login" class="max-w-sm my-auto mx-auto w-full px-3 xxs:px-6 xs:px-12 sm:px-0 flex flex-col gap-4">
      <div class="text-center mb-2 text-gray-300/75 text-3xl font-light">
        Prihlásiť sa
      </div>
      <div class="bg-gray-800/60 backdrop-blur text-gray-400 p-4 sm:p-6 rounded-xl shadow-md">
        <div class="dark flex flex-col gap-4">
          <fwb-input type="text" v-model="form.username" :validation-status="error && 'error'" size="lg">
            <template #prefix>
              <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-width="2" d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
            </template>
          </fwb-input>
          <fwb-input type="password" v-model="form.password" size="lg">
            <template #prefix>
              <svg class="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
              </svg>
            </template>
            <template #suffix>
              <fwb-button type="submit" :disabled="loading">
                <svg v-if="loading" aria-hidden="true" class="inline w-5 h-5 -mx-1.5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <svg v-else class="w-5 h-5 -mx-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14v3m4-6V7a3 3 0 1 1 6 0v4M5 11h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"/>
                </svg>
              </fwb-button>
            </template>
          </fwb-input>
        </div>
      </div>
      <button type="button" @click="$router.push({ name: 'home' })" class="mx-auto text-blue-400/75 hover:text-blue-500 transition flex justify-center items-center">
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
        </svg> späť na web
      </button>
    </form>

    <div class="fixed bottom-0 -inset-x-1/2">
      <Footer/>
    </div>

  </Header>
</template>