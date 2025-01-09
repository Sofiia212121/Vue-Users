<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CenteredContent from './../components/CenteredContent.vue';
import { register } from '@/api/auth';
import UserFormBody from '@/components/UserFormBody.vue';

// todo: get the next 6 vars from the child component
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const router = useRouter();

const handleSubmit = async () => {
  if (password.value !== passwordConfirmation.value) {
    alert('Please, confirm your password.');
    return;
  }

  let response;

  try {
    response = await register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    });
  } catch (error) {
    alert(error.response.data?.errorMessage);
    return;
  }

  console.log(response.data);

  alert('Registration successful! Please log in with your new credentials.');

  router.push('/');
};
</script>

<template>
  <CenteredContent>
    <form id="registrationForm" @submit.prevent="handleSubmit">
      <UserFormBody v-model:firstName="firstName" v-model:lastName="lastName" v-model:email="email" v-model:phone="phone"
        v-model:password="password" v-model:passwordConfirmation="passwordConfirmation" />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </CenteredContent>
</template>
