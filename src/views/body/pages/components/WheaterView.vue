<script setup>
    import {User} from '@/stores/User'
    import Forecast from './Forecast'
    import Hourcast from './Hourcast'
</script>
<script>export default {
    props: {
        wheaterData: Object
    },
    methods: {
        getWheaterByHours(hours) {
            let arr = [];
            let currentDate = new Date();
            let rootDate = new Date(
                currentDate.getFullYear()
                +"-"+
                ("0"+(currentDate.getMonth()+1)).substr(-2)
                +"-"+
                currentDate.getDate()
                +" "+
                "00:00:00"
            );
            
            for (var i = 0; i < hours; i++) {
                const diffTime = Math.abs(currentDate - rootDate);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                arr.push(this.wheaterData.forecast.forecastday[diffDays].hour[currentDate.getHours()]);
                currentDate.setTime(currentDate.getTime() + (1000 * 60 * 60)); // adding 1 hour each time
            }
            return arr;
        }
    }
}
</script>

<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-row align-items-center">
                <div class="p-1 m-1">
                    <img :src="wheaterData.current.condition.icon" />
                </div>
                <div class="d-flex flex-column text-center">
                    <strong>{{wheaterData.location.name}}</strong>
                    <small>{{wheaterData.current.temp_c}} &#8451;</small>
                    <small>{{wheaterData.current.temp_f}} &#8457;</small>
                </div>
            </div>
            <div>
                <button class="btn normal p-1 m-2" @click="User.toggleFavourite(wheaterData.location)">
                    <i class="fas fa-heart text-success" v-if="User.isFavourite(wheaterData.location.name)"></i>
                    <i class="fas fa-heart" v-else></i>
                    Favourite
                </button>
            </div>
        </div>
        <div class="container-fluid">
            <h1 class="text-center p-2">The wheater is {{wheaterData.current.condition.text}}</h1>
            <div class="row g-3">
                <Hourcast v-for="wheater in getWheaterByHours(5)" :key="wheater" :wheater="wheater" />
            </div>
        </div>
        <div class="row g-3 p-2 justify-content-center">
            <Forecast v-for="wheater in wheaterData.forecast.forecastday" :key="wheater" :wheater="wheater" />
        </div>
    </div>
</template>