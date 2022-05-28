<script>
export default {
    props: {
        wheater: Object
    }
}
</script>

<template>
    <div class="col-sm">
        <div class="shadow bg-light text-center">
            <img :src="wheater.condition.icon" width="78" />
            <div>
                <h3>{{wheater.temp_c}} &#8451;</h3>
                <h3>{{wheater.temp_f}} &#8457;</h3>
                <h1>{{wheater.time.substr(-5)}}</h1>
            </div>
        </div>
    </div>
</template>