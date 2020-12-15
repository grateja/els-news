<template>
    <div class="announcement-wrapper" v-if="!!announcement">
        <div class="announcement-content">
            <marquee behavior="" direction="">
                {{announcement.content}}
            </marquee>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentAnnouncement: null
        }
    },
    methods: {
    },
    computed: {
        announcement() {
            return this.$store.getters['announcement/getAnnouncement'];
        }
    },
    created() {
        this.$store.dispatch('announcement/loadAnnouncement');
    }
}
</script>

<style>
.announcement-wrapper {
    position: fixed;
    bottom: 0px;
    background: rgba(24, 112, 146, 0.75);
    /* box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.513); */
    color: white;
}
.announcement-content {
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.616);
    font-size: 35px;
    line-height: 35px;
    padding: 10px 0px;
    width: 100vw;
}

</style>
