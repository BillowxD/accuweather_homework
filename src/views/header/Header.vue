<script setup>
    import {User} from '@/stores/User'
    import logo from '@/assets/images/logo.png'
    import Navbar from './components/Navbar.vue'
</script>
<script>
export default {
    data() {
        return {
            showNavbar: false
        }
    },
    methods: {
        toggleDarkMode() {
            if (!User.darkMode) {
                document.body.classList.add("darkmode");
            } else {
                document.body.classList.remove("darkmode");
            }
            User.toggleDarkMode();
        }
    }
}
</script>

<template>
    <div class="bg-light pt-2 pb-2">
        <div class="container ms-auto me-auto">
            <div class="d-flex justify-content-between">
                <div class="logoContainer d-flex align-items-center"><img class="logo p-2" :src="logo" /></div>
                <div>
                    <button class="btn border-0 shadow-0" @click="toggleDarkMode">
                        {{ !User.darkMode ? 'Dark mode' : 'Light mode' }}
                    </button>
                    <button class="d-sm-none btn btn-white" :class="{'active': showNavbar}" @click="showNavbar = !showNavbar">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="bg-primary">
        <div class="container ms-auto me-auto">
            <Navbar :show="showNavbar" />
        </div>
    </div>
</template>

<style scoped>
    .logoContainer {
        width: auto;
        max-width: 200px;
    }

    .logo {
        width: 100%;
    }
</style>