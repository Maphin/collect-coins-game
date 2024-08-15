import { useGameSettingsStore, type IGridSizes, type IPoints } from '../stores/gameSettings'
import { usePlayersStore, type IPlayerCoordinates } from '@/stores/players';
import { onBeforeUnmount } from 'vue';
import router from '@/router';
import coinCatchSound from '../assets/audio/chinazes.mp3';
import coinMissSound from '../assets/audio/sauntres.mp3';

export function useGameLogic(gridSize: IGridSizes, pointsToLose: IPoints, pointsToWin: IPoints) {

    const playersStore = usePlayersStore();
    const gameSettingsStore = useGameSettingsStore();
    const coinCatchAudio = new Audio(coinCatchSound);
    const coinMissAudio = new Audio(coinMissSound);
    let intervalId: number | null = null;
    let isGameStarted = false;

    const MOVING_DIRECTIONS = {
        UP: 'up',
        DOWN: 'down',
        RIGHT: 'right',
        LEFT: 'left'
    }
    type PlayerType = 'firstPlayer' | 'secondPlayer';


    const isPlayerHere = (row : number, col : number, entity : 'firstPlayer' | 'secondPlayer' | 'coin') : boolean => {
        const entityCoordinates = playersStore.getPlayerCoordinates(entity);
        return entityCoordinates.y === col && entityCoordinates.x === row;
    }
    const getEntityInCell = (row: number, col: number) => {
        if (playersStore.coordinates.firstPlayer.x === row && playersStore.coordinates.firstPlayer.y === col) {
            return {type: 'firstPlayer', image: playersStore.images.firstPlayer};
        }
        if (playersStore.coordinates.secondPlayer.x === row && playersStore.coordinates.secondPlayer.y === col) {
            return {type: 'secondPlayer', image: playersStore.images.secondPlayer};
        }
        if (playersStore.coordinates.coin.x === row && playersStore.coordinates.coin.y === col) {
            return {type: 'coin', image: playersStore.images.coin};
        }
        return null;
    }
    const hasPlayerCaughtCoin = (player: PlayerType) : boolean => {
        const playerCoordinates = playersStore.coordinates[player];
        const coinCoordinates = playersStore.coordinates.coin;
        return playerCoordinates.x === coinCoordinates.x && playerCoordinates.y === coinCoordinates.y;
    }
    const isGameLost = () : boolean => {
        console.log(pointsToLose.number);
        return playersStore.points.coin === pointsToLose.number;
    }
    const isGameWon = (player : PlayerType) : boolean => {
        return playersStore.points[player] === pointsToWin.number;
    }
    const generateNewNumber = (number : number) : number => {
        return Math.floor(Math.random() * (number));
    }
    const isNewPlayerPositionValid = (playerPosition : IPlayerCoordinates, player : PlayerType) : boolean => {
        if (playerPosition.x < 0 || playerPosition.x > gridSize.rowsCount - 1) return false;
        if (playerPosition.y < 0 || playerPosition.y > gridSize.columnsCount - 1) return false;
        if (isPlayerHere(playerPosition.x, playerPosition.y, player)) return false;
        return true;
    }
    const changeCoinPosition = () => {
        const newPosition : IPlayerCoordinates = {...playersStore.coordinates.coin};
        do {
            newPosition.x = generateNewNumber(gridSize.columnsCount);
            newPosition.y = generateNewNumber(gridSize.rowsCount);
        } while (isPlayerHere(newPosition.x, newPosition.y, 'coin') || isPlayerHere(newPosition.x, newPosition.y, 'firstPlayer') || isPlayerHere(newPosition.x, newPosition.y, 'secondPlayer'));
        playersStore.updateCoordinates('coin', newPosition.x, newPosition.y);
    }
    const movePlayer = (player : PlayerType, direction : string) => {
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

        let anotherPlayer : PlayerType = 'firstPlayer';
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

    return {
        startGame,
        handleKeydown,
        getEntityInCell
    }
}