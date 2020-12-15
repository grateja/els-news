<template>
    <div class="board">
        <slide-show :images="images" v-if="images" />
        <!-- <video src="/videos/ELS INAUGURATION 2019 FINALCUT.mp4" autoplay></video> -->
    </div>
</template>

<script>
import SlideShow from '../shared/SlideShow.vue';
export default {
    components: {
        SlideShow
    },
    data() {
        return {
            board: {},
            images: null
        }
    },
    methods: {
        getBoard() {
            axios.get('/api/boards/today').then((res, rej) => {
                console.log(res.data.event.slides);
                if(res.data.event.event_type.name == 'slides') {
                    this.images = res.data.event.slides;
                }
                console.log(res.data);
            });
        }
    },
    mounted() {
        this.getBoard();
    }
}
</script>

<style>
.board {
    position: absolute;
    width: 80%;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    /* box-shadow: 0px 0px 70px rgba(0, 0, 0, 0.774); */
    max-height: 80vh;
    overflow: hidden;
}
</style>
