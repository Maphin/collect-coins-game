<template>
    <table v-if="gridSize" class="grid my-4 mx-2">
        <tr v-for="row in gridSize.rowsCount" :key="row" class="grid-row">
            <td v-for="column in gridSize.columnsCount" :key="column" class="grid-cell border-3 border-red-500 w-9rem h-8rem m-1 surface-overlay font-bold flex align-items-center justify-content-center">
                <div v-if="isPlayerHere(row - 1, column - 1, 'firstPlayer')">
                    <Avatar class="p-overlay-badge" image="https://img.icons8.com/?size=100&id=54270&format=png&color=000000" size="xlarge" />
                </div>
                <div v-else-if="isPlayerHere(row - 1, column - 1, 'secondPlayer')">
                    <Avatar class="p-overlay-badge" image="https://img.icons8.com/?size=100&id=rLMvblwPB6NZ&format=png&color=000000" size="xlarge" />
                </div>
                <div v-else-if="isPlayerHere(row - 1, column - 1, 'coin')">
                    <Avatar class="p-overlay-badge" image="https://img.icons8.com/?size=100&id=OFHwDWASQWmX&format=png&color=000000" size="xlarge" />
                </div>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useGameSettingsStore, type IGridSizes } from '../stores/gameSettings'
    import { usePlayersStore, type IPlayerCoordinates } from '@/stores/players';
    import { onMounted } from 'vue';
    import { onBeforeUnmount } from 'vue';

    const props = defineProps<{
        gridSize: IGridSizes;
    }>()

    const playersStore = usePlayersStore();
    const gameSettingsStore = useGameSettingsStore();

    const isPlayerHere = (row : number, col : number, entity : 'firstPlayer' | 'secondPlayer' | 'coin') : boolean => {
        const entityCoordinates = playersStore.getPlayerCoordinates(entity);
        return entityCoordinates.y === col && entityCoordinates.x === row;
    }
    const generateNewNumber = (number : number) => {
        return Math.floor(Math.random() * (number));
    }

    const changeCoinPosition  = () => {
        const newPosition : IPlayerCoordinates = {x: null, y: null};
        do {
            newPosition.x = generateNewNumber(props.gridSize.columnsCount);
            newPosition.y = generateNewNumber(props.gridSize.rowsCount);
            
            var isNewPositionMatchWithCurrentCoinPosition = isPlayerHere(newPosition.x, newPosition.y, 'coin');
            var isNewPositionMatchWithCurrentPlayer1Position = isPlayerHere(newPosition.x, newPosition.y, 'firstPlayer');
            var isNewPositionMatchWithCurrentPlayer2Position = isPlayerHere(newPosition.x, newPosition.y, 'secondPlayer');
        } while (isNewPositionMatchWithCurrentCoinPosition || isNewPositionMatchWithCurrentPlayer1Position || isNewPositionMatchWithCurrentPlayer2Position)
        
        playersStore.updateCoordinates('coin', newPosition.x, newPosition.y);
        playersStore.incrementPoints('coin');
    }

    let intervalId: number | null = null;

    // onMounted(() => {
    //     intervalId = window.setInterval(changeCoinPosition, gameSettingsStore.coinJumpInterval)
    // })

    onBeforeUnmount(() => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
    })
    
</script>

<style scoped>
</style>