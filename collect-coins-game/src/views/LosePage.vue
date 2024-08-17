<template>
    <div class="center-container">
      <div class="win-card">
        <div class="win-icon">
          <img src="../assets/images/fail.png" alt="Win Icon" />
        </div>
        <div class="win-label">Coin Win!</div>
        <div>You will be lucky next time</div>
        <div class="player-info">
          <div class="info-item">
            <span class="info-label">Catch:</span>
            <span class="info-value">{{ winner[1] }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Time:</span>
            <span class="info-value">{{ formattedTime }}</span>
          </div>
        </div>
        <Button @click="playAgain" label="Play again!" class="play-again-btn"></Button>
      </div>
    </div>
  </template>

<script setup lang="ts">
    import { computed } from 'vue';
    import router from '@/router';
    import { useGameSettingsStore } from '@/stores/gameSettings';
    import { usePlayersStore } from '@/stores/players';

    const gameSettingsStore = useGameSettingsStore();
    const playersStore = usePlayersStore();

    const playAgain = () => {
        router.push({path: '/'})
    }

    const winner = computed(() => Object.entries(playersStore.getWinner)[0]);

    const formattedTime = computed(() => {
        const paddedMinutes = String(gameSettingsStore.gameDuration.minutes).padStart(2, '0');
        const paddedSeconds = String(gameSettingsStore.gameDuration.seconds).padStart(2, '0');
        return `${paddedMinutes}:${paddedSeconds}`;
    });
</script>

<style>
    .center-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .win-card {
        background: white;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

.win-icon img {
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
}

.win-label {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.player-info {
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}

.info-label {
  font-weight: bold;
}

.info-value {
  color: #4CAF50;
}

.play-again-btn {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>