<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// /api/check
Route::group(['prefix' => 'check'], function() {
    // /api/check/all
    Route::get('all', 'LocalController@checkAll');
});

// /api/news
Route::group(['prefix' => 'news'], function() {
    // /api/news/get-initial-news
    Route::get('get-initial-news', 'NewsController@getInitialNews');

    // /api/news/get-news
    Route::get('get-news', 'NewsController@getNews');

});

// /api/announcements
Route::group(['prefix' => 'announcements'], function() {
    // /api/announcements/get-announcement
    Route::get('get-announcement', 'AnnouncementsController@getAnnouncement');

    Route::group(['middleware' => 'auth:api'], function() {
        // /api/announcements/search
        Route::get('search', 'AnnouncementsController@index');

        // /api/announcements/create
        Route::post('create', 'AnnouncementsController@store');

        // /api/announcements/{id}/update
        Route::post('{id}/update', 'AnnouncementsController@update');

        // /api/announcements/{id}/delete
        Route::post('{id}/delete', 'AnnouncementsController@delete');
    });
});


// /api/boards
Route::group(['prefix' => 'boards'], function() {
    // /api/boards/today
    Route::get('today', 'BoardsController@getBoardToday');
});

// /api/events
Route::group(['prefix' => 'events'], function() {
    Route::group(['middleware' => 'auth:api'], function() {
        // /api/events
        Route::get('/', 'EventsController@index');

        // /api/events/create
        Route::post('create', 'EventsController@store');

        // /api/events/{id}/update
        Route::post('{id}/update', 'EventsController@update');

        // /api/events/{id}/delete
        Route::post('{id}/delete', 'EventsController@delete');

        // /api/events/{id}
        Route::get('{id}', 'EventsController@show');
    });
});

// /api/slides
Route::group(['prefix' => 'slides', 'middleware' => 'auth:api'], function() {
    // /api/slides/{slideId}/delete
    Route::post('{slideId}/delete', 'SlidesController@delete');
});

// /api/videos
Route::group(['prefix' => 'videos', 'middleware' => 'auth:api'], function() {
    // /api/videos/{videoId}/delete
    Route::post('{videoId}/delete', 'VideosController@delete');
});

// /api/files
Route::group(['prefix' => 'files', 'middleware' => 'auth:api'], function() {
    // /api/files/upload-slides/{eventId}
    Route::post('upload-slides/{eventId}', 'FilesController@uploadSlides');

    // /api/files/upload-video/{eventId}
    Route::post('upload-video/{eventId}', 'FilesController@uploadVideo');
});

// /api/announcements
Route::group(['prefix' => 'announcements', 'middleware' => 'auth:api'], function() {
});

// /api/auth
Route::group(['prefix' => 'auth'], function() {
    // /api/auth/login
    Route::post('login', 'OAuthController@login');

    // /api/auth/check
    Route::post('check', 'OAuthController@check');

    // /api/auth/logout
    Route::post('logout', 'OAuthController@logout')->middleware('auth:api');
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

