<template>
    <div>
        {{id}}
        <b-carousel id="board" v-model="sliding" controls>
            <!-- <b-carousel-slide v-for="img in images" :key="img.id"></b-carousel-slide> -->
            <b-carousel-slide img-src="/img/today/img (1).jpg">

            </b-carousel-slide>
            <b-carousel-slide img-src="/img/today/img (2).jpg">

            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
export default {
    props: {
        images: {},
        id: {}
    },
    data() {
        return {
            sliding: 2
        }
    }
}
</script>
