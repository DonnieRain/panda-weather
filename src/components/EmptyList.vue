<template>
    <div class="empty">
        <img src="https://walkingmobilityclinics.com/wp-content/uploads/2020/06/covid-symptoms-icons-250.png" alt="empty">
        <h2>
            {{ t('emptyListText') }}
        </h2>

        <div class="empty-actions">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n({ useScope: 'global' })
</script>

<style>
.empty {
    width: 100%;
    margin-top: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.empty-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
</style>