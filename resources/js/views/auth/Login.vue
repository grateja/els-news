<template>
    <div class="main">
        <v-card class="pa-4 login">
            <h3>Login</h3>
            <v-divider></v-divider>
            <form @submit.prevent="login">
                <v-text-field v-model="user.email" label="Email" autofocus></v-text-field>
                <v-text-field v-model="user.password" label="Password" type="password"></v-text-field>
                <v-btn type="submit" class="primary ma-0" :loading="loading">Login</v-btn>
            </form>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        login() {
            if(this.loading) return;
            this.$store.dispatch('auth/login', {
                user: this.user
            }).then((res, rej) => {

                window.location.href = '/manage';
            });
        }
    },
    computed: {
        loading() {
            return this.$store.getters['auth/isLoading'];
        }
    }
}
</script>

<style>
.main {
    height: 100vh;
    background: url('/img/bg-login.jpg');
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
}
.login {
    margin: auto;
    width: 400px;
}
</style>
