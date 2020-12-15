<template>
    <div class="news-wrapper">
        <div class="news-item ma-1 pa-1" v-for="article in articles" :key="article.id">
            <v-layout>
                <v-flex xs3 v-if="!!article.urlToImage">
                    <v-responsive>
                        <v-img :src="article.urlToImage"></v-img>
                    </v-responsive>
                </v-flex>
                <v-flex xs9>
                    <div class="pl-1">
                        <h5 class="subheader">{{article.title}}</h5>
                        <p class="caption grey--text">{{article.description}}</p>
                    </div>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
            index: 5
        }
    },
    methods: {
        getNews() {
            axios.get('/api/news/get-initial-news').then((res, rej) => {
                this.articles = res.data.news.articles;
            }).then((res, rej) => {
                this.pushNews();
            });
        },
        pushNews() {
            if(this.index >= 19) {
                this.index = 0;
            }
            axios.get('/api/news/get-news', {
                params: {
                    page: ++this.index
                }
            }).then((res, rej) => {
               this.articles.shift();
                console.log('index', this.index);
                this.articles.push(res.data.article);
                setTimeout(this.pushNews, 20000);
            });
        }
    },
    mounted() {
        this.getNews();
    }
}
</script>

<style>
div.news-item {
    background: rgba(207, 207, 207, 0.527);
    width: 24.2vw;
    height: 10vh;
    float: left;
    overflow: hidden;
}

div.news-wrapper {
    width: 160vw;
    position: fixed;
    bottom: 60px;
}
</style>
