<template>
    <div class="date-time-wrapper">
        <div class="clock">
            {{currentTime}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        currentTime() {
            var dateWithouthSecond = new Date();
            let time = dateWithouthSecond.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            return time;
        }
    }
}
</script>
<style>
.digi-clock {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900;
    width: 100%;
    text-align: center;
    padding: 20px;
}
.clock {
    font-style: italic;
    font-size: 3em;
    display: block;
    line-height: 1em;
}
.date {
    display: block;
    font-size: 2em;
}
</style>
