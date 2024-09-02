<template>
    <div class="flex justify-content-center align-items-center my-5">
        <div class="card bg-black-alpha-20 border-round-3xl border-1 p-3 pl-4 inline-flex w-8 align-items-center justify-content-evenly">
            <div 
                v-for="entity in entities" 
                :key="entity.label" 
                class="flex align-items-center gap-2 font-medium"
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
    </div>
</template>

<script setup lang="ts">
    import { usePlayersStore } from '@/stores/players';
    import { computed } from 'vue';
    import { useFormattedTime } from './common/formatTime';

    const playersStore = usePlayersStore();
    const { formattedTime } = useFormattedTime();

    const entities = computed(() => [
        { label: playersStore.labels.firstPlayer, image: playersStore.images.firstPlayer, points: playersStore.points.firstPlayer },
        { label: playersStore.labels.secondPlayer, image: playersStore.images.secondPlayer, points: playersStore.points.secondPlayer },
        { label: playersStore.labels.coin, image: playersStore.images.coin, points: playersStore.points.coin },
    ]);
</script>

./common/useFormattedTime./common/formatTime