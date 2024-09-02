import { defineStore } from "pinia";

interface ISelectedGridSize {
    rowsCount: number
    columnsCount: number
}

export interface IGridSizes extends ISelectedGridSize {
    size: 'string'
    code: 'string'
}

export interface IPoints {
    number: number
    code: string
}

export interface ITime {
    minutes: number
    seconds: number
}

export interface GameSettingsState {
    gridSizes: IGridSizes[],
    pointsToWin: IPoints[],
    pointsToLose: IPoints[],
    coinJumpInterval: number,
    soundOn: boolean,
    gameDuration: ITime,
    isGameStarted: boolean
}

export const useGameSettingsStore = defineStore<'gameSettings',GameSettingsState>({
    id: 'gameSettings',
    state: () => ({
        gridSizes: [
            { size: '4x4', rowsCount: 4, columnsCount: 4, code: '1' },
            { size: '5x5', rowsCount: 5, columnsCount: 5, code: '2' },
            { size: '6x6', rowsCount: 6, columnsCount: 6, code: '3' },
        ] as unknown as IGridSizes[],
        coinJumpInterval : 1000,
        pointsToWin: [
            { number: 10, code: '1' },
            { number: 20, code: '2' },
            { number: 30, code: '3' },
            { number: 40, code: '4' },
            { number: 50, code: '5' }
        ] as IPoints[],
        pointsToLose: [
            { number: 10, code: '1' },
            { number: 20, code: '2' },
            { number: 30, code: '3' },
            { number: 40, code: '4' },
            { number: 50, code: '5' }
        ] as IPoints[],
        soundOn: true,
        gameDuration: {
            minutes: 0,
            seconds: 0
        },
        isGameStarted: false
    }),
    actions: {
        updateGameTime(action : 'increment' | 'reset', param: 'minutes' | 'seconds') {
            if (action === 'increment') {
                this.gameDuration[param]++;
            } else if (action === 'reset') {
                this.gameDuration[param] = 0;
            }
        },
        toggleSound(value : boolean) {
            this.soundOn = value;
        },
        changeGameStatus(value: boolean) {
            this.isGameStarted = value;
        }
    }
})