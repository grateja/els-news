<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="8000">
    <div class="carousel-inner">
        @foreach($images as $img)
            <div class="carousel-item {{$img->order == 1 ? 'active' : ''}}">
                <img class="d-block w-100" src="/{{$img->source}}" alt="Second slide">
            </div>
        @endforeach
    </div>
</div>
