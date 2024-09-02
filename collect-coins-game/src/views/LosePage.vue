<template>
	<div class="h-screen flex align-items-center justify-content-center">
		<Card class="flex align-items-center justify-content-center w-13rem pt-2">
			<template #header>  
				<img src="../assets/images/fail.png" alt="Lose Icon" class="h-5rem"/>
			</template>
			<template #title>
			<div class="text-center text-3xl font-bold">
				Coin Win!
			</div>
			</template>
			<template #subtitle>
			<div class="text-center text-base">
				You will be lucky next time
			</div>
			</template>
			<template #content>
				<div class="flex justify-content-between my-1">
					<span class="font-bold">Catch:</span>
					<span class="info-value">{{ winner[1] }}</span>
				</div>
				<div class="flex justify-content-between my-2">
					<span class="font-bold">Time:</span>
					<span class="info-value">{{ formattedTime }}</span>
				</div>
			</template>
			<template #footer>
				<div class="flex justify-content-center">
					<Button @click="playAgain" label="Play again!" severity="sucess" class="text-yellow-400 font-semibold" raised></Button>
				</div>
			</template>
		</Card>
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

<style scoped>
	/* .center-container {
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
} */

.info-value {
  color: #4CAF50;
}
</style>