import { defineStore } from "pinia";
import { ref } from 'vue';

export const usePlayersPointsStore = defineStore('points',{
    state: () => ({
        firstPlayerPoints: 1,
        secondPlayerPoints: 10
    }),
    getters: {
        getFirstPlayerPoints(): number {
            return this.firstPlayerPoints;
        },
        getSecondPlayerPoints(): number {
            return this.secondPlayerPoints;
        },
    },
    actions: {
        incrementFirstPlayerPoints() {
            this.firstPlayerPoints++;
        },
        incrementSecondPlayerPoints() {
            this.secondPlayerPoints++;
        },
        resetPoints() {
            this.firstPlayerPoints = 0;
            this.secondPlayerPoints = 0;
        }
    }
})