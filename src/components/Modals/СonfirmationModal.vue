<template>
    <div class="confirmation-modal">
        <div class="confirmation-modal__wrapper">
            <h2>{{ props.title }}</h2>
            <div class="confirmation-modal__actions">
                <button
                    class=""
                    @click="emit('cancel')"
                >
                    Cancel
                </button>
                <button
                    class=""
                    @click="emit('confirm')"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['cancel', 'confirm'])
const props = defineProps({
    title: String
})
</script>

<style>
.confirmation-modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.confirmation-modal__wrapper {
    padding: 40px;
    background-color: beige;
}
</style>