<template>
    <div>
        <v-layout>
            <v-flex>
                <v-card>
                    <video v-if="source" :src="source" controls id="video"></video>
                    <v-card-text class="text-xs=center">
                        <v-btn @click="deleteVideo" v-if="event.video">Delete</v-btn>
                        <v-btn @click="browseVideo" v-else>Add Video</v-btn>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <video-dialog v-model="openBrowseVideo" @ok="saveVideo"></video-dialog>
    </div>
</template>
<script>
import VideoDialog from './VideoDialog.vue';
export default {
    components: {
        VideoDialog
    },
    props: [
        'event'
    ],
    data() {
        return {
            openBrowseVideo: false
        }
    },
    methods: {
        browseVideo() {
            this.openBrowseVideo = true;
        },
        saveVideo(formData) {
            this.$store.dispatch('file/uploadVideo', {
                formData,
                eventId: this.event.id
            }).then((res, rej) => {
                this.$emit('updateVideo', res.data.video);
                console.log(res.data);
            });
        },
        deleteVideo() {
            if(confirm('Are you sure you want remove this video?')) {
                this.$store.dispatch('video/deleteVideo', this.event.video.id).then((res, rej) => {
                    this.$emit('updateVideo', null);
                });
            }
        }
    },
    computed: {
        source() {
            if(this.event && this.event.video) {
                return this.event.video.source;
            }
        }
    }
}
</script>

<style scoped>
#video {
    width: 100%;
}
</style>
