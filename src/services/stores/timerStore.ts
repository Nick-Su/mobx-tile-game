import { makeAutoObservable } from "mobx";
import gameStore from "./gameStore";

export class Timer {
    secondsPassed: number = 0;
    private interval: any; 

    constructor() {
        makeAutoObservable(this);
    }

    increaseTimer() {
        this.secondsPassed++;
    }

    decreaseTimer() {
        if (this.secondsPassed > 0) {
            this.secondsPassed--;
        } else {
            this.stopTimer();
            gameStore.setIsGameOver(true);
        }
    }

    resetTimer() {
        this.secondsPassed = 0;
    }

    startTimer() {
        this.interval = window.setInterval(() => this.increaseTimer(), 1000);
    }

    stopTimer() {
        window.clearInterval(this.interval)
    }

    startCountdownTimer() {
        this.secondsPassed = 4;
        this.interval = window.setInterval(() => this.decreaseTimer(), 1000);
    }
}

const timerStore = new Timer();

export default timerStore;
