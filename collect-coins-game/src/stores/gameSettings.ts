import { defineStore } from "pinia";

interface ISelectedGridSize {
    rowsCount: number
    columnsCount: number
}

interface IGridSizes extends ISelectedGridSize {
    size: 'string'
    code: 'string'
}

interface IPoints {
    number: number
    code: string
}

interface GameSettingsState {
    // selectedGridSize: ISelectedGridSize
    // selectedPointsToWin: null | IPoints
    // selectedPointsToLose: null | IPoints
    gridSizes: IGridSizes[],
    pointsToWin: IPoints[],
    pointsToLose: IPoints[],
}

export const useGameSettingsStore = defineStore<'gameSettings',GameSettingsState>({
    id: 'gameSettings',
    state: () => ({
        // selectedGridSize: null,
        // selectedPointsToWin: null,
        // selectedPointsToLose: null,
        // selectedGridSize:  {
        //     rowsCount: 4,
        //     columnsCount: 4,
        // },
        gridSizes: [
            { size: '4x4', rowsCount: 4, columnsCount: 4, code: '1' },
            { size: '5x5', rowsCount: 5, columnsCount: 5, code: '2' },
            { size: '6x6', rowsCount: 6, columnsCount: 6, code: '3' },
        ] as unknown as IGridSizes[],
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
        ] as IPoints[]
    }),
    getters: {
        // getGridSize(): ISelectedGridSize {
        //     return {...this.selectedGridSize};
        // },
        getPointsToWin(): IPoints[] {
            return this.pointsToWin.map(point => ({...point}));
        },
        getPointsToLose() {
            return this.pointsToLose.map(point => ({...point}));
        }
    },
    // actions: {
    //     setSelectedGridSize(gridSize: IGridSize) {
    //         this.gridSize = gridSize;
    //     },
    //     setSelectedPointsToWin(points: IPoints) {
    //         this.selectedPointsToWin = points;
    //     },
    //     setSelectedPointsToLose(points: IPoints) {
    //         this.selectedPointsToLose = points;
    //     }
    // }
})