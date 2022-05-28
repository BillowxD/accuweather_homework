<script>
export default {
    props: {
        wheater: Object
    },
    computed: {
        dayOfWeek() {
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const d = new Date(this.wheater.date);
            return weekday[d.getDay()];
        }
    }
}
</script>

<template>
    <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="card bg-light">
            <div class="d-flex justify-content-between align-items-center">
                <img :src="wheater.day.condition.icon" width="78" />
                <div class="d-flex flex-column text-center p-3">
                    <div>{{dayOfWeek}}</div>
                    <small>{{wheater.date}}</small>
                </div>
            </div>
            <div class="container-fluid font-weight-bold">
                <table>
                    <tbody>
                        <tr>
                            <td><i class="fa-solid fa-temperature-full fa-2x p-3"></i></td>
                            <td>{{wheater.day.maxtemp_c}} &#8451; | {{wheater.day.maxtemp_f}} &#8457;</td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-temperature-empty fa-2x p-3"></i></td>
                            <td>{{wheater.day.mintemp_c}} &#8451; | {{wheater.day.mintemp_c}} &#8457;</td>
                        </tr>
                        <tr>
                            <td><i class="fa-solid fa-temperature-half fa-2x p-3"></i></td>
                            <td>{{wheater.day.avgtemp_c}} &#8451; | {{wheater.day.avgtemp_f}} &#8457;</td>
                        </tr>
                        <tr>
                            <td><img src="https://cdn.weatherapi.com/weather/64x64/day/113.png" /></td>
                            <td>Sunrise {{wheater.astro.sunrise}}</td>
                        </tr>
                        <tr>
                            <td><img src="https://cdn.weatherapi.com/weather/64x64/night/113.png" /></td>
                            <td>Moonset {{wheater.astro.moonset}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>