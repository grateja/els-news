<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// main news
Route::get('/', 'NewsController@eventToday');
Route::get('/login', function() {
    return view('login');
});

Route::get('{any}', function() {
    return view('welcome');
})->where('any', '.*');
// })->where('all', '^(?!api).*$');


// events
Route::group(['prefix' => 'events', 'middleware' => 'auth'], function() {
    // /events
    Route::get('/', 'EventsController@index');

    // /events/create
    Route::get('/create', 'EventsController@create');

    // /events/store
    Route::post('/store', 'EventsController@store');

    // /events/{id}/edit
    Route::get('/{id}/edit', 'EventsController@edit');

    // /events/{id}/update
    Route::post('/{id}/update', 'EventsController@update');

    // /events/{id}/delete
    Route::post('/{id}/delete', 'EventsController@delete');
});

// boards
Route::group(['prefix' => 'boards', 'middleware' => 'auth'], function() {
    // boards/slides
    Route::group(['prefix' => 'slides'], function() {
        // boards/slides/
        Route::get('/', 'SlidesController@index');

        // boards/slides/{id}
        Route::group(['prefix' => '{id}'], function() {
            // boards/slides/{id}/create
            Route::get('/create', 'SlidesController@create');

            // boards/slides/{id}/preview
            Route::get('/preview', 'SlidesController@view');
        });
    });

    // boards/videos
    Route::group(['prefix' => 'videos'], function() {

    });

    // boards/texts
    Route::group(['prefix' => 'texts'], function() {

    });

    // boards/youttube
    Route::group(['prefix' => 'youttube'], function() {

    });
});


Route::group(['prefix' => 'manage'], function() {
    Route::get('/', 'ManageController@index');

    Route::group(['prefix' => 'create'], function() {
        Route::get('/', 'ManageController@create');
        Route::get('/{id}/{event_type}', 'ManageController@create');

        // Route::get('/{id}/video', 'ManageController@video');
        // Route::get('/{id}/text', 'ManageController@text');
        // Route::get('/{id}/youtube', 'ManageController@youtube');

    });

    Route::post('/store', 'ManageController@store');

    Route::get('/{id}', 'ManageController@show');
});

Route::get('/home', 'HomeController@index')->name('home');
