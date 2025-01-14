<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import CenteredContent from './../components/CenteredContent.vue';
import { login } from '@/api/auth';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  let response;

  try {
    response = await login({
      email: email.value,
      password: password.value
    });
    alert('Login successfully!');
  } catch (error) {
    alert(error?.response?.data?.errorMessage);
    return;
  }

  authStore.setToken(response.data?.token);

  router.push('/users');
};
</script>

<template>
  <CenteredContent>
    <form id="loginForm" @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" name="email" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" minlength="8" class="form-control" name="password" id="password" v-model="password"
          required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </CenteredContent>
</template>
