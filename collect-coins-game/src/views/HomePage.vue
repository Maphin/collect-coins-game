<template>
    <div>
        <AppScoreBar />
        <Message class="message" closable>Control is done with "arrows for player 1" and "WASD for player 2"</Message>
    </div>
</template>

<script setup lang="ts">
    import AppScoreBar from '../components/AppScoreBar.vue'
</script>

<style scoped>
    .message {
        width: 50%;
        margin: 0 auto;
    }
</style>