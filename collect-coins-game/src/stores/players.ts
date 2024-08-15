import { defineStore } from "pinia";
import { ref } from 'vue';

export interface IPlayersPoints {
    firstPlayer: number
    secondPlayer: number
    coin: number
}
export interface IPlayerCoordinates {
    x: number
    y: number
}
export interface ICoordinates {
    firstPlayer: IPlayerCoordinates
    secondPlayer: IPlayerCoordinates
    coin: IPlayerCoordinates
}
export interface Imgages {
    firstPlayer: string
    secondPlayer: string
    coin: string
}

export interface IPlayersState {
    points: IPlayersPoints
    coordinates: ICoordinates
    images: Imgages
}

export const usePlayersStore = defineStore<'players', IPlayersState>('players', {
    state: (): IPlayersState => ({
        points: {
            firstPlayer: 0,
            secondPlayer: 0,
            coin: 0
        },
        coordinates: {
            firstPlayer: {
                x: 0,
                y: 0,
            },
            secondPlayer: {
                x: 3,
                y: 3
            },
            coin : {
                x: 2, 
                y: 1
            }
        },
        images: {
            firstPlayer: 'https://img.icons8.com/?size=100&id=54270&format=png&color=000000',
            secondPlayer: 'https://img.icons8.com/?size=100&id=rLMvblwPB6NZ&format=png&color=000000',
            coin: 'https://img.icons8.com/?size=100&id=OFHwDWASQWmX&format=png&color=000000'
        }
    }),
    getters: {
        getPlayerPoints: (state) => (player :  'firstPlayer' | 'secondPlayer' | 'coin') : number => {
            return state.points[player];
        },
        getPlayerCoordinates: (state) => (player : 'firstPlayer' | 'secondPlayer' | 'coin') : IPlayerCoordinates => {
            return {...state.coordinates[player]};
        }
    },
    actions: {
        incrementPoints(entity : 'firstPlayer' | 'secondPlayer' | 'coin') {
            this.points[entity]++;
        },
        resetPoints() {
            this.points.firstPlayer = 0;
            this.points.secondPlayer = 0;
        },
        updateCoordinates(entity : 'firstPlayer' | 'secondPlayer' | 'coin', newX : number, newY : number) {
            this.coordinates[entity].x = newX;
            this.coordinates[entity].y = newY;
        }
    }
})