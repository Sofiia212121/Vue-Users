<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    passwordConfirmation: String,
});

defineEmits(['update:firstName', 'update:lastName', 'update:email', 'update:phone', 'update:password', 'update:passwordConfirmation']);
</script>

<template>
    <div>
        <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input type="text" class="form-control" :value="firstName"
                @input="$emit('update:firstName', $event.target.value)" required/>
        </div>
        <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" :value="lastName"
                @input="$emit('update:lastName', $event.target.value)" required/>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" :value="email" @input="$emit('update:email', $event.target.value)" required/>
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="tel" class="form-control" :value="phone" @input="$emit('update:phone', $event.target.value)" required/>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" :value="password"
                @input="$emit('update:password', $event.target.value)" required/>
        </div>
        <div class="mb-3">
            <label for="passwordConfirmation" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" :value="passwordConfirmation"
                @input="$emit('update:passwordConfirmation', $event.target.value)" required/>
        </div>
    </div>
</template>
