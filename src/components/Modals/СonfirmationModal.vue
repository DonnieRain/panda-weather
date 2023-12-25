<template>
    <div class="confirmation-modal">
        <div class="confirmation-modal__wrapper">
            <h2>{{ props.title }}</h2>
            <div class="confirmation-modal__actions flex justify-center">
                <button @click="emit('cancel')">
                    Cancel
                </button>
                <button @click="emit('confirm')">
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
    /* background-color: beige; */
    min-width: 0;
    max-width: 100%;
    padding: 20px;
    max-height: 150px; 
    border-radius: 18px;
    background: linear-gradient(145deg, #1c1d21, #17181c);
    box-shadow:  3px 3px 6px #101114, 
                -3px -3px 6px #24252a;

    .confirmation-modal__actions {
        margin-top: 20px;
    }
    
    button {
        cursor: pointer;
        padding: 10px;
        margin-right: 20px;
        width: 120px;
        text-align: center;
        font-weight: bold;
        border-radius: 18px;
        transition: background 0.1s, color 0.1s;
        color: #8a8a8a;
        background: linear-gradient(145deg, #1c1d21, #17181c);
        box-shadow:  3px 3px 6px #101114, 
                    -3px -3px 6px #24252a;
        &:hover {
            background: #141414;
            color: #bbb;
        }
    }

    h2 {
        color:#f1eeee;
    }
}
</style>