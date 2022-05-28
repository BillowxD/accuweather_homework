<script setup>
    import NavItem from './NavItem.vue';
</script>

<script>
export default {
    props: {
        show: Boolean
    }
}
</script>

<template>
    <ul class="d-sm-inline-flex userPanel align-items-center pt-2 pb-2" :class="{'d-none': !show, 'd-block': show}">
        <NavItem href="/" text="Home" />
        <NavItem href="/favourites" text="Favourites" />
    </ul>
</template>

<style scoped>
    ul.userPanel {
        list-style: none;
        padding: 0;
        margin: 0;
    }

</style>