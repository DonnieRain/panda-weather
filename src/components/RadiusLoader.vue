<template>
    <div class="loader">
        <svg
            class="radius-loader"
            width="250px"
            height="250px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#f1eeee"
                stroke-width="2"
                r="44"
                stroke-dasharray="207.34511513692632 71.11503837897544"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1.3513513513513513s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                />
            </circle>
        </svg>
    </div>
</template>
<style scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
