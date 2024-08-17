<template>
    <div class="flex align-items-center justify-content-evenly mt-2">
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full mb-1">Grid size</label>
            <Select v-model="localSelectedGridSize" @change="emitGridSizeChange" inputId="dd-points" :options="gameSettingsStore.gridSizes" optionLabel="size" class="w-full" />
        </div>
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full mb-1">Select points to win</label>
            <Select v-model="localSelectedPointsToWin" @change="emitPointsToWinChange" inputId="dd-points" :options="gameSettingsStore.pointsToWin" optionLabel="number" class="w-full" />
        </div>
        <div class="card w-9rem md:w-56">
            <label for="dd-points" class="block w-full mb-1">Select points to loose</label>
            <Select v-model="localSelectedPointsToLose" @change="emitPointsToLoseChange" inputId="dd-points" :options="gameSettingsStore.pointsToLose" optionLabel="number" class="w-full" />
        </div>
        <div>
            <label for="switch1" class="block w-full mb-1">Sound On</label>
            <ToggleSwitch v-model="checked" @change="toggleSound" inputId="switch1"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useGameSettingsStore } from '../stores/gameSettings';
    import type { IGridSizes, IPoints } from '@/stores/gameSettings';

    const gameSettingsStore = useGameSettingsStore();

    const props = defineProps<{
        selectedGridSize: IGridSizes,
        selectedPointsToWin: IPoints,
        selectedPointsToLose: IPoints,
    }>()
    const emit = defineEmits(['updateGridSize', 'updatePointsToWin', 'updatePointsToLose']);
    
    const localSelectedGridSize = ref(props.selectedGridSize);
    const localSelectedPointsToWin = ref(props.selectedPointsToWin);
    const localSelectedPointsToLose = ref(props.selectedPointsToLose);
    const checked = ref(gameSettingsStore.soundOn);

    const toggleSound = () => {
        gameSettingsStore.toggleSound(checked.value);
    }

    const emitGridSizeChange = () => {
        emit('updateGridSize', localSelectedGridSize.value);
    };

    const emitPointsToWinChange = () => {
        emit('updatePointsToWin', localSelectedPointsToWin.value);
    };

    const emitPointsToLoseChange = () => {
        emit('updatePointsToLose', localSelectedPointsToLose.value);
    };
</script>
