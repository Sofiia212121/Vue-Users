<script setup>
import { onMounted, ref } from 'vue';
import { getUsers, deleteUser } from '@/api/users';
import Modal from '@/components/Modal.vue';
import UserFormBody from '@/components/UserFormBody.vue';
import { register } from '@/api/auth';

const modalRef = ref(null);
const users = ref([]);
const form = ref(null);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const getUsersList = async () => {
    let response;
    try {
        response = await getUsers();
    } catch (error) {
        console.log(error);
        return;
    }

    users.value = response.data;
    console.log(users.value);
};

onMounted(getUsersList);

const userDelete = async (userId) => {
    const isConfirmed = confirm('Are you sure you want to delete this user?');

    if (!isConfirmed) {
        return;
    }

    try {
        await deleteUser(userId);
        alert('User successfully deleted!');
    } catch (error) {
        alert(`Error when deleting user: ${error.message}`);
        return;
    }

    users.value = users.value.filter(user => user.id !== userId);
};

const addUser = async () => {
    if (!form.value.reportValidity()) {
        return;
    }

    try {
        await register({
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

    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phone.value = '';
    password.value = '';
    passwordConfirmation.value = '';

    const modalElement = modalRef.value.$el;
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();

    alert('User successfully added!');
    getUsersList();
};
</script>

<template>
    <table class="table table-dark table-striped">
        <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.firstName }}</td>
                <td>{{ user.LastName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>
                    <button @click="userDelete(user.id)" class="btn btn-danger">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</button>

    <Modal
        ref="modalRef"
        modalId="addUserModal"
        modalTitle="Add User"
        sucessBtn="Add"
        @modalSuccessClick="addUser"
    >
        <form ref="form">
            <UserFormBody
                v-model:firstName="firstName"
                v-model:lastName="lastName"
                v-model:email="email"
                v-model:phone="phone"
                v-model:password="password"
                v-model:passwordConfirmation="passwordConfirmation" />
        </form>
    </Modal>
</template>
