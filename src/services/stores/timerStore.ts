import { makeAutoObservable } from "mobx";

export class Timer {
    secondsPassed: number = 0;
    private interval: any; 

    constructor() {
        makeAutoObservable(this);
    }

    increaseTimer() {
        this.secondsPassed++;
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
}

const timerStore = new Timer();

export default timerStore;
