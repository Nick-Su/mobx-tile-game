import { makeAutoObservable } from "mobx";

export enum GameMode {
    Countdown = 'Countdown',
    Training = 'Training',
}

class Game {
    boardSize: number = 4;
    gameMode: string = GameMode.Training;
    isGameOver: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setGameMode(gameMode: string) {
        this.isGameOver = false;
        this.gameMode = gameMode;
    }

    setIsGameOver(value: boolean) {
        this.isGameOver = value;
    }

    saveBoardSize(size: number) {
        this.boardSize = size;
    }
}

const gameStore = new Game();

export default gameStore;
