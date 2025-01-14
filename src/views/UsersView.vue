<script setup>
import { onMounted, ref } from 'vue';
import { getUsers, deleteUser, updateUser, updateUserPassword } from '@/api/users';
import Modal from '@/components/Modal.vue';
import UserFormBody from '@/components/UserFormBody.vue';
import { register } from '@/api/auth';

const addUserModalRef = ref(null);
const editUserModalRef = ref(null);
const changePasswordModalRef = ref(null);
const modals = {
    addUserModal: addUserModalRef,
    editUserModal: editUserModalRef,
    changePasswordModal: changePasswordModalRef
};

const addUserForm = ref(null);
const editUserForm = ref(null);

const users = ref([]);
const selectedUserId = ref(0);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const oldPassword = ref('');
const newPassword = ref('');
const passwordConfirmation = ref('');

const getUsersList = async () => {
    try {
        const response = await getUsers();
        users.value = response.data;
    } catch (error) {
        alert(`Error fetching users: ${error}`);
    }
};

const userDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        await deleteUser(userId);
    } catch (error) {
        alert(error?.response?.data?.errorMessage);
        return;
    }

    users.value = users.value.filter(user => user.id !== userId);
    alert('User successfully deleted!');
    getUsersList();
};

const addUser = async () => {
    if (!addUserForm.value.reportValidity()) {
        return;
    }

    if (newPassword.value !== passwordConfirmation.value) {
        alert('Invalid password confirmation');
        return;
    }

    try {
        await register({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            password: newPassword.value,
        });
    } catch (error) {
        alert(error?.response?.data?.errorMessage);
        return;
    }

    closeModal(addUserModalRef);
    alert('User successfully added!');
    getUsersList();
};

const editUser = async () => {
    if (!editUserForm.value.reportValidity()) {
        return;
    }

    try {
        await updateUser(selectedUserId.value, {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
        });
    } catch (error) {
        alert(error?.response?.data?.message);
        return;
    }

    closeModal(editUserModalRef);
    alert('User successfully updated!');
    getUsersList();
};

const changePassword = async () => {
    try {
        await updateUserPassword(selectedUserId.value, {
            password: oldPassword.value,
            newPassword: newPassword.value,
            passwordConfirmation: passwordConfirmation.value
        });
    } catch (error) {
        alert(error?.response?.data?.errorMessage);
        return;
    }

    closeModal(changePasswordModalRef);
    alert('Password successfully changed!');
};

const clearInputs = () => {
    selectedUserId.value = 0;
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phone.value = '';
    oldPassword.value = '';
    newPassword.value = '';
    passwordConfirmation.value = '';
};

const showModal = (modalName, user = null) => {
    if (!modals.hasOwnProperty(modalName)) {
        alert(`No such modal: ${modalName}`);
        return;
    }

    const modalRef = modals[modalName];

    clearInputs();

    if (user) {
        selectedUserId.value = user.id;
        firstName.value = user.firstName;
        lastName.value = user.lastName;
        email.value = user.email;
        phone.value = user.phone;
    }

    const modalElement = modalRef.value.$el;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
};

const closeModal = (modalRef) => {
    clearInputs();

    const modalElement = modalRef.value.$el;
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
};

onMounted(getUsersList);
</script>

<template>
    <Modal ref="addUserModalRef" modalId="addUserModal" modalTitle="Add User" sucessBtn="Add" @modalSuccessClick="addUser">
        <form ref="addUserForm">
            <UserFormBody v-model:firstName="firstName" v-model:lastName="lastName" v-model:email="email"
                v-model:phone="phone" v-model:password="newPassword" v-model:passwordConfirmation="passwordConfirmation" />
        </form>
    </Modal>

    <Modal ref="editUserModalRef" modalId="editUserModal" modalTitle="Edit User" sucessBtn="Save"
        @modalSuccessClick="editUser">
        <form ref="editUserForm">
            <UserFormBody v-model:firstName="firstName" v-model:lastName="lastName" v-model:email="email"
                v-model:phone="phone" v-model:userId="selectedUserId" />
        </form>
    </Modal>

    <Modal ref="changePasswordModalRef" modalId="changePasswordModal" modalTitle="Change Password"
        sucessBtn="Change Password" @modalSuccessClick="changePassword">
        <form ref="form">
            <div class="mb-3">
                <label class="form-label">Old Password</label>
                <input type="password" v-model="oldPassword" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">New Password</label>
                <input type="password" v-model="newPassword" class="form-control" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Confirm New Password</label>
                <input type="password" v-model="passwordConfirmation" class="form-control" required>
            </div>
        </form>
    </Modal>

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
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>
                    <button @click="userDelete(user.id)" class="btn btn-danger">Delete</button>
                    <button @click="showModal('editUserModal', user)" class="btn btn-primary">Edit</button>
                    <button @click="showModal('changePasswordModal', user)" class="btn btn-secondary">Change
                        Password</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-success" @click="showModal('addUserModal')">Add User</button>
</template>
