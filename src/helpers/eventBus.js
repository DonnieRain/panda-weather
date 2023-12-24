import { ref } from "vue";
const busEvent = ref(new Map());

export default function useEventsBus(){

    function emitEvent(event, ...args) {
        busEvent.value.set(event, args);
    }

    return {
        emitEvent,
        busEvent
    }
}