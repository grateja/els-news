<template>
    <div class="news-content">
        <board />
        <google-news />
        <clock />
        <announcement />
    </div>
</template>

<script>
import Clock from './Clock.vue';
import GoogleNews from './GoogleNews.vue';
import Announcement from './Announcement.vue';
import Board from './Board.vue';

export default {
    components: {
        Clock,
        GoogleNews,
        Announcement,
        Board
    },
    data() {
        return {
            board: null
        }
    }
}
</script>

<style>
</style>
