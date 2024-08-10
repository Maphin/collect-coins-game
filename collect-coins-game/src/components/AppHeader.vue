<template>
    <div class="flex align-items-center justify-content-evenly">
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Grid size</label>
            <Select v-model="selectedGridSize" inputId="dd-points" :options="gameSettingsStore.gridSizes" optionLabel="size" class="w-full" />
        </div>
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Select points to win</label>
            <Select v-model="selectedPointsToWin" inputId="dd-points" :options="gameSettingsStore.pointsToWin" optionLabel="number" class="w-full" />
        </div>
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full">Select points to loose</label>
            <Select v-model="selectedPointsToLose" inputId="dd-points" :options="gameSettingsStore.pointsToLose" optionLabel="number" class="w-full" />
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useGameSettingsStore } from '../stores/gameSettings';

    const gameSettingsStore = useGameSettingsStore();
    const selectedGridSize = ref(gameSettingsStore.gridSizes[0]);
    const selectedPointsToWin = ref(gameSettingsStore.pointsToWin[0]);
    const selectedPointsToLose = ref(gameSettingsStore.pointsToLose[0]);

    
</script>
