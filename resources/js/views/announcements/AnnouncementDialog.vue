<template>
    <v-dialog :value="value" max-width="480" persistent>
        <v-card>
            <v-card-title>Announcement</v-card-title>

            <v-card-text>
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            :value="computedDateFormattedMomentjs"
                            label="Date"
                            readonly
                            v-on="on"
                            :error-messages="errors.get('date')"
                        ></v-text-field>
                    </template>

                    <v-date-picker
                        v-model="date"
                        @change="menu1 = false"
                    ></v-date-picker>
                </v-menu>
                <v-textarea :error-messages="errors.get('content')" label="Content" v-model="content"></v-textarea>
            </v-card-text>

            <v-card-actions>
                <v-btn @click="deleteAnnouncement" v-if="mode == 'update'">delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="ok" :loading="saving">ok</v-btn>
                <v-btn @click="close">close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import moment from 'moment';

export default {
    components: {
        moment
    },
    props: [
        'value',
        'announcement'
    ],
    data() {
        return {
            date: new Date().toISOString().substr(0, 10),
            content: '',
            menu1: false,
            mode: 'create'
        }
    },
    methods: {
        close() {
            this.$emit('input', false);
            this.content = '';
            this.date = new Date().toISOString().substr(0, 10);
            this.$store.commit('announcement/clearErrors');
        },
        ok() {
            // this.$emit('ok', {
            //     date: this.date,
            //     content: this.content
            // });
            let data = {
                content: this.content,
                date: this.date,
                // id: this.announcement ? this.announcement.id : null
            }
            this.$store.dispatch(`announcement/${this.mode}Announcement`, {
                announcement: data,
                id: this.announcement ? this.announcement.id : null
            }).then((res, rej) => {
                this.$emit('ok', res.data.announcement);
                this.close();
            });
        },
        deleteAnnouncement() {
            if(confirm('Are you sure you want to delete this announcement?')) {
                this.$store.dispatch('announcement/deleteAnnouncement', this.announcement.id).then((res, rej) => {
                    this.$emit('removeAnnouncement', this.announcement);
                    this.$emit('input', false);
                });
            }
        }
    },
    watch: {
        announcement(val) {
            if(val) {
                this.date = new Date(val.date).toISOString().substr(0, 10);
                this.content = val.content;
                this.mode = 'update';
            } else {
                this.date = new Date().toISOString().substr(0, 10);
                this.content = '';
                this.mode = 'create';
            }
        }
    },
    computed: {
        computedDateFormattedMomentjs() {
            return this.date ? moment(this.date).format('MMMM DD, YYYY') : ''
        },
        errors() {
            return this.$store.getters['announcement/getErrors'];
        },
        saving() {
            return this.$store.getters['announcement/getIsSaving'];
        }
    }
}
</script>
