$(document).ready(function() {
    var template = $('#newsTemplate').html();
    var news = $('#newsContent');
    var page = 1;

    function getInitialNews() {
        $.get({
            url: '/api/news/get-initial-news',
            success: function(res) {
                var articles = res.news.articles;
                var $html = '';

                for (var index = 0; index < articles.length; index++) {
                    var article = articles[index];
                    $html += toHtmlArticle(article);
                }

                $('#newsContent').html($html);

                setTimeout(pushNews, 5000);
            },
            error: function(err) {
                console.log('failed to load news. Retry in 1 min', err);
                setTimeout(getInitialNews, 60000);
            }
        });
    }

    function toHtmlArticle(article) {
        return template.replace(/{{title}}/, article.title)
        .replace(/{{description}}/, article.description)
        .replace(/{{urlToImage}}/, article.urlToImage);
    }

    function pushNews() {
        if(page >= 20) {
            page = 1;
        }
        $.get({
            url: '/api/news/get-news',
            data: {
                page: page++
            },
            success: function(res) {
                pushArticle(toHtmlArticle(res.article));
                setTimeout(pushNews, 10000);
            },
            error: function(err) {
                console.log('Failed to load news resource. Retry in 1 min', err);
                setTimeout(pushNews, 60000);
            }
        })
    }

    function pushArticle(articleHtml) {
        $(news).children().first().hide(1500, function() {
            $(this).remove();
            $(news).append(articleHtml);
        });
    }

    getInitialNews();
});
