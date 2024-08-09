<template>
    <div class="card border-round-3x1 p-3 pl-4 flex align-items-center justify-content-evenly">
        <div class="flex align-items-center gap-2">
            <label for="player1">Player 1</label>
            <Avatar class="p-overlay-badge" image="https://img.icons8.com/?size=100&id=54270&format=png&color=000000" size="xlarge" />
            <div>{{ playersPointsStore.getFirstPlayerPoints }}</div>
            <button @click="playersPointsStore.incrementFirstPlayerPoints">+</button>
        </div>
        <div class="flex align-items-center gap-2">
            <label for="player2">Player 2</label>
            <Avatar class="p-overlay-badge" image="https://img.icons8.com/?size=100&id=rLMvblwPB6NZ&format=png&color=000000" size="xlarge" />
            <div>{{ playersPointsStore.getSecondPlayerPoints }}</div>
            <button @click="playersPointsStore.incrementSecondPlayerPoints">+</button>
        </div>
        <div class="flex align-items-center gap-2">
            <label for="coin">Coin</label>
            <Avatar class="p-overlay-badge" image="https://img.icons8.com/?size=100&id=OFHwDWASQWmX&format=png&color=000000" size="xlarge" />
            <div>Here points will be</div>
        </div>
        <div class="flex align-items-center gap-2">
            <label for="time">Time</label>
            <div>00:00</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { usePlayersPointsStore } from '../stores/playersPoints';

    const playersPointsStore = usePlayersPointsStore();
</script>
