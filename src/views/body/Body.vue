<script setup>
    import {PATH} from '@/stores/Url'
    import Home from './pages/Home.vue'
    import Favourites from './pages/Favourites.vue'
</script>
<script>
export default {
    async created() {
    }
}
</script>

<template>
    <div class="container ms-auto me-auto" :key="PATH.key(0)">
        <Favourites v-if="PATH.pageContains('/favourites')" />
        <Home v-else :key="PATH.param('view') " />
    </div>
</template>