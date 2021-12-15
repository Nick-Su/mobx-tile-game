import { makeAutoObservable } from "mobx";
import gameStore from "./gameStore";

const getSeconds = (): number => {
    switch (gameStore.playgroundSize) {
        case 2:
            return 5;
        case 4:
            return 45;
        case 6:
            return 300;
        case 8:
            return 450;
        case 10:
            return 600;
        default:
            return 30
    }
}

class Timer {
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
            return;
        }

        this.stopTimer();
        gameStore.setIsGameOver(true);
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
        this.secondsPassed = getSeconds();
        this.interval = window.setInterval(() => this.decreaseTimer(), 1000);
    }
}

const timerStore = new Timer();

export default timerStore;
