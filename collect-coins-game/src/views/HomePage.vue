<template>
    <div>
        <AppSettings 
            :selectedGridSize="selectedGridSize"
            :selectedPointsToWin="selectedPointsToWin"
            :selectedPointsToLose="selectedPointsToLose"
            @updateGridSize="updateGridSize"
            @updatePointsToWi="updatePointsToWin"
            @updatePointsToLose="updatePointsToLose"
        />
        <AppScoreBar />
        <Message class="message" closable>Control is done with "arrows for player 1" and "WASD for player 2"</Message>
        <AppGrid :gridSize="selectedGridSize"/>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import AppSettings from '../components/AppSettings.vue';
    import AppScoreBar from '../components/AppScoreBar.vue';
    import AppGrid from '../components/AppGrid.vue';
    import type { IGridSizes, IPoints } from '@/stores/gameSettings';

    const selectedGridSize = ref();
    const selectedPointsToWin = ref();
    const selectedPointsToLose = ref();

    const updateGridSize = (newSize : IGridSizes) => {
        selectedGridSize.value = {...newSize};
    }
    const updatePointsToWin = (newPoints : IPoints) => {
        selectedPointsToWin.value = {...newPoints};
    }
    const updatePointsToLose = (newPoints : IPoints) => {
        selectedPointsToLose.value = {...newPoints};
    }
</script>

<style scoped>
    .message {
        width: 50%;
        margin: 0 auto;
    }
</style>