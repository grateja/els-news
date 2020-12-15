<template>
    <v-container>
        <h3>Announcements</h3>
        <v-btn block class="transparent" flat @click="createAnnouncement">
            <v-icon left>add</v-icon>
            Create new announcement</v-btn>
        <v-list v-if="announcements.length">
            <v-list-tile v-for="announcement in announcements" :key="announcement.id" @click="showAnnouncement($event, announcement)">
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{_moment(announcement.date)}}
                    </v-list-tile-title>
                    <div>
                        <div class="caption grey--text">
                            {{announcement.content}}
                        </div>
                    </div>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <announcement-dialog v-model="openAnnouncement" :announcement="activeAnnouncement" @ok="updateAnnouncements" @removeAnnouncement="removeAnnouncement"></announcement-dialog>
    </v-container>
</template>


<script>
import moment from 'moment';
import AnnouncementDialog from './AnnouncementDialog.vue';

export default {
    components: {
        AnnouncementDialog,
        moment
    },
    data() {
        return {
            announcements: [],
            keyword: '',
            page: 1,
            openAnnouncement: false,
            activeAnnouncement: null
        }
    },
    methods: {
        load() {
            axios.get('/api/announcements/search', {
                params: {
                    keyword: this.keyword,
                    page: this.page
                }
            }).then((res, rej) => {
                this.announcements = res.data.announcements.data;
            });
        },
        createAnnouncement() {
            this.activeAnnouncement = null;
            this.openAnnouncement = true;
        },
        updateAnnouncements(data) {
            console.log('announcement', data);
            let announcement = this.announcements.find(a => a.id == data.id);
            if(announcement != null) {
                announcement.date = data.date;
                announcement.content = data.content;
            } else {
                // this.announcements.push(data);
                // console.log('data.date', data.date);
                let index = this.announcements.map(a => a.date).indexOf(data.date);
                this.announcements.splice(index, 0, data);
                // console.log('index', index);
            }
        },
        showAnnouncement(e, announcement) {
            e.stopPropagation();
            this.activeAnnouncement = announcement;
            this.openAnnouncement = true;
        },
        removeAnnouncement(announcement) {
            this.announcements = this.announcements.filter(a => a.id != announcement.id);
        },
        _moment(date) {
            return moment(date).format('MMMM DD, YYYY');
        }
    },
    created() {
        this.load();
    }
}
</script>
