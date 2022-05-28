<script setup>
    import {PATH} from '@/stores/Url'
</script>

<script>
    export default {
        props: {
            href: {
                type: String,
                default: () => null
            },
            text: String,
            active: {
                type: Boolean,
                default: () => false
            }
        },
        computed: {
            link() {
                if (this.href === null) return "javascript:void(0);";
                return this.href;
            }
        }
    }
</script>

<template>
    <li :key="PATH.key(0)" :class="{
            'active': (PATH.pageContains(href) && href !== '/') || PATH.isCurrentPage(href)
        }">
        <a :href="link" @click.prevent="PATH.changeUrl(href)">{{text}}</a>
    </li>
</template>

<style scoped>
    li {
        box-shadow: none;
        border: 0;
        padding: 2px 1rem;
        font-weight: bold;
    }

    li a {
        color: var(--link-color);
    }

    li.active a {
        color: var(--link-color-active);
    }
</style>