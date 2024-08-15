<template>
    <Button @click="startGame" label="Start Game" severity="success" raised class="block mx-auto mt-4"></Button>
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
    import { useGameSettingsStore, type IGridSizes, type IPoints } from '../stores/gameSettings'
    import { usePlayersStore, type IPlayerCoordinates } from '@/stores/players';
    import { onBeforeUnmount } from 'vue';
    import router from '@/router';
    import coinCatchSound from '../assets/audio/chinazes.mp3';
    import coinMissSound from '../assets/audio/sauntres.mp3';

    const props = defineProps<{
        gridSize: IGridSizes;
        pointsToLose: IPoints;
        pointsToWin: IPoints;
    }>()

    const playersStore = usePlayersStore();
    const gameSettingsStore = useGameSettingsStore();
    let intervalId: number | null = null;
    let isGameStarted = false;
    const coinCatchAudio = new Audio(coinCatchSound);
    const coinMissAudio = new Audio(coinMissSound);
    const MOVING_DIRECTIONS = {
        UP: 'up',
        DOWN: 'down',
        RIGHT: 'right',
        LEFT: 'left'
    }


    const isPlayerHere = (row : number, col : number, entity : 'firstPlayer' | 'secondPlayer' | 'coin') : boolean => {
        const entityCoordinates = playersStore.getPlayerCoordinates(entity);
        return entityCoordinates.y === col && entityCoordinates.x === row;
    }
    const hasPlayerCaughtCoin = (player: 'firstPlayer' | 'secondPlayer') : boolean => {
        const playerCoordinates = playersStore.coordinates[player];
        const coinCoordinates = playersStore.coordinates.coin;
        return playerCoordinates.x === coinCoordinates.x && playerCoordinates.y === coinCoordinates.y;
    }
    const isGameLost = () : boolean => {
        return playersStore.points.coin === props.pointsToLose.number;
    }
    const isGameWon = (player : 'firstPlayer' | 'secondPlayer') : boolean => {
        return playersStore.points[player] === props.pointsToWin.number;
    }
    const generateNewNumber = (number : number) : number => {
        return Math.floor(Math.random() * (number));
    }
    const isNewPlayerPositionValid = (playerPosition : IPlayerCoordinates, player : 'firstPlayer' | 'secondPlayer') : boolean => {
        if (playerPosition.x < 0 || playerPosition.x > props.gridSize.rowsCount - 1) return false;
        if (playerPosition.y < 0 || playerPosition.y > props.gridSize.columnsCount - 1) return false;
        if (isPlayerHere(playerPosition.x, playerPosition.y, player)) return false;
        return true;
    }
    const changeCoinPosition = () => {
        const newPosition : IPlayerCoordinates = {...playersStore.coordinates.coin};
        do {
            newPosition.x = generateNewNumber(props.gridSize.columnsCount);
            newPosition.y = generateNewNumber(props.gridSize.rowsCount);
        } while (isPlayerHere(newPosition.x, newPosition.y, 'coin') || isPlayerHere(newPosition.x, newPosition.y, 'firstPlayer') || isPlayerHere(newPosition.x, newPosition.y, 'secondPlayer'));
        playersStore.updateCoordinates('coin', newPosition.x, newPosition.y);
    }
    const movePlayer = (player : 'firstPlayer' | 'secondPlayer', direction : string) => {
        const newPosition : IPlayerCoordinates = {...playersStore.coordinates[player]};

        switch (direction) {
            case MOVING_DIRECTIONS.UP:
                newPosition.y--;
                break;
            case MOVING_DIRECTIONS.DOWN:
                newPosition.y++;
                break;
            case MOVING_DIRECTIONS.RIGHT:
                newPosition.x++;
                break;
            case MOVING_DIRECTIONS.LEFT:
                newPosition.x--;
                break;
        }

        let anotherPlayer : 'firstPlayer' | 'secondPlayer' = 'firstPlayer';
        if (player === 'firstPlayer') {
            anotherPlayer = 'secondPlayer';
        }
        const isNewPositionValid : boolean = isNewPlayerPositionValid(newPosition, anotherPlayer);
        if (!isNewPositionValid) return;

        playersStore.updateCoordinates(player, newPosition.x, newPosition.y);
        
        if (hasPlayerCaughtCoin(player)) {
            playersStore.incrementPoints(player);
            coinCatchAudio.currentTime = 0;
            coinCatchAudio.play();
            checkGameState();
        }
    }
    const handleKeydown = (event: KeyboardEvent) => {
        switch (event.code) {
            case 'ArrowUp':
                movePlayer('firstPlayer', MOVING_DIRECTIONS.UP);
                break;
            case 'ArrowDown':
                movePlayer('firstPlayer', MOVING_DIRECTIONS.DOWN);
                break;
            case 'ArrowLeft':
                movePlayer('firstPlayer', MOVING_DIRECTIONS.LEFT);
                break;
            case 'ArrowRight':
                movePlayer('firstPlayer', MOVING_DIRECTIONS.RIGHT);
                break;
            case 'KeyW':
                movePlayer('secondPlayer', MOVING_DIRECTIONS.UP);
                break;
            case 'KeyS':
                movePlayer('secondPlayer', MOVING_DIRECTIONS.DOWN);
                break;
            case 'KeyA':
                movePlayer('secondPlayer', MOVING_DIRECTIONS.LEFT);
                break;
            case 'KeyD':
                movePlayer('secondPlayer', MOVING_DIRECTIONS.RIGHT);
                break;
        }
};

    const checkGameState = () => {
        if (isGameWon('firstPlayer') || isGameWon('secondPlayer')) {
            clearInterval(intervalId!);
            router.push({ path: 'win' });
        } else if (isGameLost()) {
            clearInterval(intervalId!);
            isGameStarted = false;
            router.push({ path: 'lose' });
        }
    };

    const startGame = () => {
        if (isGameStarted) throw new Error('The game is already started');

        isGameStarted = true;
        playersStore.points.firstPlayer = 0;
        playersStore.points.secondPlayer = 0;
        playersStore.points.coin = 0;

        intervalId = window.setInterval(() => {
            if (!hasPlayerCaughtCoin('firstPlayer') && !hasPlayerCaughtCoin('secondPlayer')) {
                playersStore.incrementPoints('coin');
                coinMissAudio.currentTime = 0;
                coinMissAudio.play();
            }
            changeCoinPosition();
            checkGameState();
        }, gameSettingsStore.coinJumpInterval);

        window.addEventListener('keydown', handleKeydown);
    }

    onBeforeUnmount(() => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        window.removeEventListener('keydown', handleKeydown);
    })
    
</script>

<style scoped>
</style>