<script>
export default {
    props: {
        text: String
    }
}
</script>

<template>
    <div class="alert alert-warning text-center m-2" v-html="text"></div>
</template>