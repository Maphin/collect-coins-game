<template>
    <div class="center-container">
        <div class="lose-label">
            You lost! Coin win
        </div>
        <Button @click="playAgain" label="Play again!" class="block mx-auto"></Button>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';

    const playAgain = () => {
        router.push({path: '/'})
    }
</script>

<style>
    .center-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    }

    .lose-label {
        text-align: center;
        margin-bottom: 20px;
    }
</style>