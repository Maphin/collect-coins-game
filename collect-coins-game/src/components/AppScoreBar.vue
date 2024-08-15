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
            <div>00:00</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayersStore } from '@/stores/players';
import { computed } from 'vue';

const playersStore = usePlayersStore();
const entities = computed(() => [
    { label: 'Player 1', image: playersStore.images.firstPlayer, points: playersStore.points.firstPlayer },
    { label: 'Player 2', image: playersStore.images.secondPlayer, points: playersStore.points.secondPlayer },
    { label: 'Coin', image: playersStore.images.coin, points: playersStore.points.coin },
]);
</script>
