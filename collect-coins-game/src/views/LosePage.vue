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
	import { usePlayersStore } from '@/stores/players';
	import { useFormattedTime } from '@/components/common/formatTime';

	const playersStore = usePlayersStore();
	const { formattedTime } = useFormattedTime();

	const playAgain = () => {
		router.push({path: '/'})
	}
	const winner = computed(() => Object.entries(playersStore.getWinner)[0]);
</script>

<style scoped>
	.info-value {
		color: #4CAF50;
	}
</style>