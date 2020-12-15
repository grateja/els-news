<template>
    <v-toolbar v-if="!!user" fixed>
        <v-toolbar-items>
            <v-btn :to="link.path" flat v-for="(link, i) in links" :key="i">
                {{link.text}}
            </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <user-panel :user="user" />
    </v-toolbar>
</template>

<script>
import UserPanel from './UserPanel.vue';

export default {
    components: {
        UserPanel
    },
    data() {
        return {
            links: [
                {
                    path: '/events',
                    text: 'Events'
                },
                {
                    path: '/announcements',
                    text: 'Announcements'
                },
                {
                    path: '/news',
                    text: 'News'
                }
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser;
        }
    }
}
</script>
