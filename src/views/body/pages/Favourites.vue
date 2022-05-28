<script setup>
    import {User} from '@/stores/User'
    import FavouriteItem from './components/FavouriteItem.vue'
</script>

<template>
    <div class="container-fluid p-4">
        <div class="row g-3">
            <FavouriteItem v-for="key in Object.keys(User.favourites)" :key="key" :item="User.favourites[key]"/>
        </div>
    </div>
</template>