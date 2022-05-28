<script setup>
    import {PATH} from '@/stores/Url'
    import {User} from '@/stores/User'

    import Loading from '@/components/loading.vue'
    import errorMsg from '@/components/errorMsg.vue'
    import iconInput from '@/components/iconInput.vue'
    import WheaterView from './components/WheaterView.vue'
</script>
<script>
export default {
    data() {
        return {
            loading: true,
            view: null,
            suggestions: []
        }
    },
    methods: {
        async autoComplete(value) {
            if (value.length) {
                try {
                    let req = await fetch("http://api.weatherapi.com/v1/search.json?"+new URLSearchParams({
                        key: User.apiKey,
                        q: value
                    }));
                    if (req.status !== 200) throw 'Api request failed';
                    let res = await req.json();
                    this.suggestions = res;
                } catch (e) {
                    console.log(e);
                }
            } else this.suggestions = [];
        },
        async viewLocation(e) {
            let form = e.target;
            var formData = new FormData(form);
            [...formData.entries()].map((item) => {
                PATH.setUrlParam(item[0], item[1]);
            });
            this.loadLocation();
        },
        async loadLocation() {
            let pos = PATH.param('view');
            if (pos === null) pos = await User.getLocationPosition();
            try {
                let req = await fetch("http://api.weatherapi.com/v1/forecast.json?"+new URLSearchParams({
                    key: User.apiKey,
                    q: pos,
                    days: 5,
                    aqi: "no",
                    alerts: "no"
                }));
                if (req.status !== 200) throw 'Api request failed';
                let res = await req.json();
                this.view = res;
            } catch(e) {
                this.view = {
                    error: {
                        message: `
                            <h4>Error occured, we couldn't proccess this request..</h4><br />
                            It's either the place you are looking for is not found or the server couldn't process your request.<br />
                            Please choose the locations from the auto complete input
                        `
                    }
                }
            }
        }
    },
    computed: {
        apiError() {
            return this.view !== null && typeof this.view.error !== typeof undefined;
        }
    },
    async created() {
        this.loading = true;
        await this.loadLocation();
        this.loading = false;
    }
}
</script>

<template>
    <div class="row justify-content-center mt-4 mb-4">
        <div class="col-lg-6 col-xl-4">
            <form class="d-flex flex-row" @submit.prevent="viewLocation" autocomplete="off">
                <div class="position-relative flex-grow-1">
                    <iconInput icon="fa-solid fa-magnifying-glass" name="view" :suggest="suggestions" @typingDone="autoComplete" @clickOut="suggestions = []" />
                </div>
                <button class="btn normal" type="submit">View</button>
            </form>
        </div>
    </div>
    <div class="row">
        <div class="col-12 position-relative">
            <div class="card bg-white">
                <Loading v-if="loading" />
                <errorMsg v-else-if="apiError" :text="view.error.message" />
                <WheaterView v-else :wheaterData="view" />
            </div>
        </div>
    </div>
</template>