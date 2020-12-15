<template>
    <div v-if="!!user">
        {{user.name}}
        <v-btn fab flat @click="logout">
            <v-icon>logout</v-icon>
        </v-btn>
    </div>
</template>
<script>
export default {
    props: [
        'user'
    ],
    methods: {
        logout() {
            this.$store.dispatch('auth/logout').then((res, rej) => {
                this.$router.push('/login');
            });
        }
    }
}
</script>
