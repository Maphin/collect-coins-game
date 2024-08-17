<template>
    <div class="card border-round-3x1 p-3 pl-4 flex align-items-center justify-content-evenly">
        <div 
            v-for="entity in entities" 
            :key="entity.label" 
            class="flex align-items-center gap-2"
        >
            <label :for="entity.label">{{ entity.label }}</label>
            <Avatar 
                class="p-overlay-badge" 
                :image="entity.image" 
                size="xlarge" 
            />
            <div>{{ entity.points }}</div>
        </div>
        <div class="flex align-items-center gap-2">
            <label for="time">Time</label>
            <div>{{ formattedTime }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { usePlayersStore } from '@/stores/players';
    import { useGameSettingsStore } from '@/stores/gameSettings';
    import { computed } from 'vue';

    const playersStore = usePlayersStore();
    const gameSettingsStore = useGameSettingsStore();

    const entities = computed(() => [
        { label: playersStore.labels.firstPlayer, image: playersStore.images.firstPlayer, points: playersStore.points.firstPlayer },
        { label: playersStore.labels.secondPlayer, image: playersStore.images.secondPlayer, points: playersStore.points.secondPlayer },
        { label: playersStore.labels.coin, image: playersStore.images.coin, points: playersStore.points.coin },
    ]);


    const formattedTime = computed(() => {
        const paddedMinutes = String(gameSettingsStore.gameDuration.minutes).padStart(2, '0');
        const paddedSeconds = String(gameSettingsStore.gameDuration.seconds).padStart(2, '0');
        return `${paddedMinutes}:${paddedSeconds}`;
    });
</script>
