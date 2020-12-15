import $ from 'jquery';

//if(!news) return;
$(document).ready(function () {
    currentPage = 1;
    interval = 30000;
    var template = $('#newsTemplate').html();

    function get() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=ph&' +
        'apiKey=e8f43388480f45dd8e297078121879fa&' +
        // 'apiKey=07d358e9363049169c3ee8f7a9579f27&' +
        'page=' + currentPage + '&' + 'pageSize=' + size;
      $.get(url).done(function (data) {
        console.log('data received', currentPage);

        if (data.articles.length == 0) {
          currentPage = 0;
          get();
          return;
        } // process the data


        $('.news').children().first().slideUp(1000, function () {
          $(this).remove();
          $('.news').append(toHtmlArticles(data.articles));
        }); // set currentpage to number of articles (1 to 5)

        currentPage += data.articles.length; // do it again

        setTimeout(function () {
          get();
        }, interval);
      });
    }

    function toHtmlArticles(articles) {
      var html = '';
      articles.forEach(function (article) {
        html += template.replace(/{{img}}/, article.urlToImage).replace(/{{title}}/, article.title).replace(/{{description}}/, article.description);
      });
      return html;
    } // initial get


    get(5);
    return; // let template = $('#newsTemplate').html();
    // let articles = [];
    // let interval = 1000;
    // let counter = 0;
    // function get() {
    //     console.log('initialized');
    //     var url = 'https://newsapi.org/v2/top-headlines?' +
    //         'country=ph&' +
    //         'apiKey=e8f43388480f45dd8e297078121879fa';
    //     $.get(url).done(function(data) {
    //         console.log('request received');
    //         // get the first 5
    //         articles = data.articles;
    //         initialArticles = articles.splice(0, 5);
    //         appendArticles(initialArticles);
    //         // let html = '';
    //         // initialArticles.forEach(news => {
    //         //     html += toHtmlArticle(news);
    //         //     // html += template.replace(/{{img}}/, news.urlToImage)
    //         //     //     .replace(/{{title}}/, news.title)
    //         //     //     .replace(/{{description}}/, news.description);
    //         // });
    //         // $('.news').html(html);
    //     }).catch(err => {
    //         console.log('Error occured', err);
    //         console.log('Retrying...');
    //         get();
    //     });
    // }
    // function getArticle() {
    //     return articles[++counter];
    // }
    // function appendArticles(_articles) {
    //     if(_articles.length == 5) {
    //         // initial append
    //         let html = '';
    //         _articles.forEach(article => {
    //             html += toHtmlArticle(article);
    //         });
    //         $('.news').html(html);
    //         setTimeout(appendArticle, interval);
    //     }
    // }
    // function appendArticle() {
    //     console.log(counter);
    //     $('.news').append(toHtmlArticle(getArticle()));
    //     removeArticle();
    // }
    // function removeArticle() {
    //     $('.news').children().first().slideUp(1000, function() {
    //         $(this).remove();
    //         setTimeout(appendArticle, interval);
    //     });
    // }
    // function toHtmlArticle(article) {
    //     return template.replace(/{{img}}/, article.urlToImage)
    //         .replace(/{{title}}/, article.title)
    //         .replace(/{{description}}/, article.description);
    // }
    // get();
    // function get() {
    //     console.log('request sent');
    //     $.get(url).done(function(data) {
    //         let html = '';
    //         data.articles.forEach(news => {
    //             html += template.replace(/{{img}}/, news.urlToImage)
    //                 .replace(/{{title}}/, news.title)
    //                 .replace(/{{description}}/, news.description);
    //             });
    //         $('.news').html(html);
    //         setTimeout(get, 60000);
    //     }).catch(err => {
    //         console.log('Error occured', err);
    //         console.log('Retrying...');
    //         get();
    //     });
    // }
    // function appendNews() {
    // }
    // get();
  });
