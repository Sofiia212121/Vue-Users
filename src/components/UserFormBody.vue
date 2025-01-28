<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

defineProps({
    userId: {
        type: Number,
        required: false,
        default: 0,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
        default: '',
    },
    passwordConfirmation: {
        type: String,
        required: false,
        default: '',
    },
});

defineEmits(['update:firstName', 'update:lastName', 'update:email', 'update:phone', 'update:password', 'update:passwordConfirmation']);
</script>

<template>
    <div>
        <div class="mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" :value="firstName" v-validation="'firstName'"
                @input="$emit('update:firstName', $event.target.value)" required />
        </div>
        <div class="mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" :value="lastName" v-validation="'lastName'"
                @input="$emit('update:lastName', $event.target.value)" required />
        </div>
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" :value="email" v-validation="'email'"
                @input="$emit('update:email', $event.target.value)" required />
        </div>
        <div class="mb-3">
            <label class="form-label">Phone</label>
            <input v-mask="'+38 (0##) ###-##-##'" type="tel" class="form-control" :value="phone" v-validation="'phone'"
                @input="$emit('update:phone', $event.target.value)" required />
        </div>
        <div v-if="!userId" class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" :value="password" v-validation="'password'"
                @input="$emit('update:password', $event.target.value)" required />
        </div>
        <div v-if="!userId" class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-control" :value="passwordConfirmation" v-validation="'passwordConfirmation'"
                @input="$emit('update:passwordConfirmation', $event.target.value)" required />
        </div>
    </div>
</template>
