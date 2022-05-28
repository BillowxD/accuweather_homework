<script>
import clickOut from '@/directives/clickOut'
export default {
    props: {
        type: {
            type: String,
            default:()=>"text"
        },
        icon: {
            type: String,
            default:()=>null
        },
        name: String,
        suggest: {
            type: Array,
            default:()=>[]
        } 
    },
    directives: {
        clickOut
    },
    data() {
        return {
            typeTimeout: null,
            value: ""
        }
    },
    methods: {
        typing() {
            if (this.typing != null) clearInterval(this.typeTimeout);
            this.typeTimeout = setTimeout(function() {
                this.$emit('typingDone', this.value);
                this.typeTimeout = null;
            }.bind(this), 300);
        }
    }
}
</script>

<template>
    <div class="position-relative" v-clickout>
        <div class="d-flex flex-row border align-items-center bg-light">
            <i class="p-2" :class="icon" v-if="icon !== null" />
            <input class="flex-grow-1 border-0 p-2 bg-light" :type="type" :name="name" @input="typing" v-model="value" />
        </div>
        <div class="suggestions position-absolute border bg-white w-100 top-100" v-if="suggest.length">
            <div v-for="suggestion in suggest" :key="suggestion" class="suggestion" @click="value=suggestion.name">{{suggestion.name}}</div>
        </div>
    </div>
</template>

<style scoped>
    input:focus {
        outline: none;
    }

    .suggestions {
        z-index: 999;
    }

    .suggestion {
        padding: 2px 4px;
        cursor: pointer;
    }

    .suggestion:hover {
        background: var(--mdb-gray);
        color: var(--mdb-white);
    }
</style>