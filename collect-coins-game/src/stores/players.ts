import { defineStore } from "pinia";
import { ref } from 'vue';

export interface IPlayersPoints {
    firstPlayer: number
    secondPlayer: number
}

export interface IPlayerCoordinates {
    x: number
    y: number
}

export interface Coordinates {
    firstPlayer: IPlayerCoordinates
    secondPlayer: IPlayerCoordinates
}

export interface IPlayersState {
    points: IPlayersPoints,
    coordinates: Coordinates
}

export const usePlayersStore = defineStore<'players', IPlayersState>('players', {
    state: (): IPlayersState => ({
        points: {
            firstPlayer: 1,
            secondPlayer: 10
        },
        coordinates: {
            firstPlayer: {
                x: 0,
                y: 0,
            },
            secondPlayer: {
                x: 2,
                y: 2
            }
        }
    }),
    getters: {
        getFirstPlayerPoints(): number {
            return this.points.firstPlayer;
        },
        getSecondPlayerPoints(): number {
            return this.points.secondPlayer;
        },
    },
    actions: {
        incrementFirstPlayerPoints() {
            this.points.firstPlayer++;
        },
        incrementSecondPlayerPoints() {
            this.points.secondPlayer++;
        },
        resetPoints() {
            this.points.firstPlayer = 0;
            this.points.secondPlayer = 0;
        }
    }
})