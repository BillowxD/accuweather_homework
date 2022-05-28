<script setup>
    import {PATH} from '@/stores/Url'
    import {User} from '@/stores/User'
    import errorMsg from '@/components/errorMsg.vue'
</script>
<script>
export default {
    props: {
        item: Object
    },
    data() {
        return {
            loading: true,
            wheaterData: {}
        }
    },
    computed: {
        countryImg() {
            return 'https://countryflagsapi.com/png/'+this.item.country;
        },
        apiError() {
            return this.wheaterData !== null && typeof this.wheaterData.error !== typeof undefined;
        }
    },
    async created() {
        this.loading = true;
        try {
            let req = await fetch("http://api.weatherapi.com/v1/current.json?"+new URLSearchParams({
                key: User.apiKey,
                q: this.item.name,
                aqi: "no"
            }));
            if (req.status !== 200) throw 'Api request failed';
            let res = await req.json();
            this.wheaterData = res;
        } catch(e) {
            this.wheaterData = {
                error: {
                    message: `
                        <h4>Error occured, we couldn't proccess this request..</h4><br />
                        It's either the place you are looking for is not found or the server couldn't process your request.<br />
                        Please choose the locations from the auto complete input
                    `
                }
            }
        }
        this.loading = false;
    }
}
</script>

<template>
    <div class="col-lg-6 col-xl-4">
        <div class="card bg-white h-100 position-relative">
            <div class="card-title d-flex align-items-center p-3 text-uppercase justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <img :src="countryImg" width="48" />
                    <h4 class="m-0 p-2">{{item.country}}</h4>
                </div>
                <button class="btn normal p-1 m-2" @click="User.toggleFavourite(item)">
                    <i class="fas fa-heart text-success" v-if="User.isFavourite(item.name)"></i>
                    <i class="fas fa-heart" v-else></i>
                    Favourite
                </button>
            </div>
            <div class="text-center">
                <h2>{{item.name}}</h2>
                <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                <errorMsg v-else-if="apiError" :text="wheaterData.error.message" />
                <template v-else>
                    <img :src="wheaterData.current.condition.icon" width="68" />
                    <h3>{{wheaterData.current.temp_c}} &#8451;</h3>
                    <h3>{{wheaterData.current.temp_f}} &#8457;</h3>
                </template>
            </div>
            <div class="w-100 card-bottom position-absolute bottom-0 d-flex align-items-center justify-content-center">
                <button class="btn normal text-primary" @click="PATH.changeUrl('/?view='+item.name)">View full details</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card {
        padding-bottom: 50px;
    }

    .card .card-bottom {
        height: 50px;
    }
</style>