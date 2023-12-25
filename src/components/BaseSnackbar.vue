<template>
    <Transition name="bounce">
        <div
            v-if="visible"
            class="snackbar"
            :class="type"
        >
            {{ message }}
        </div>
    </Transition>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import useEventsBus from '@/helpers/eventBus';

const { busEvent } = useEventsBus()
const visible = ref(false)
const type = ref('')
const message = ref('')

watch(()=>busEvent.value.get('show-snackbar'), (val) => {
    visible.value = true
    type.value = val[0].type
    message.value = val[0].message
    setTimeout(() => {
        visible.value = false
        type.value = ''
        message.value = ''
    }, 3000)
})
</script>
  
<style scoped>
    .snackbar {
        position: fixed;
        bottom: 16px;
        right: 20px;
        background-color: #333;
        color: #fff;
        padding: 16px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        &.error {
            background-color: red;
        }
        &.success {
            background-color: green;
        }
        &.info {
            background-color: darkcyan;
        }
    }
    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }
    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }
</style>