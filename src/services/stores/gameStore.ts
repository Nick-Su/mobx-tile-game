import { makeAutoObservable } from "mobx";

export enum GameMode {
    Countdown = 'Countdown',
    Training = 'Training',
}

class Game {
    // isNewGameMenuOpened: boolean = false;
    isGameStarted: boolean = false;
    boardSize: number = 4;

    gameMode: string = GameMode.Training;
    isGameOver: boolean = false;
    isYouWin: boolean = false;

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

    savePlaygroundSize(size: number) {
        this.boardSize = size;
    }

    startGame() {
        this.isYouWin = false;
        this.isGameStarted = true;
    }
}

const gameStore = new Game();

export default gameStore;
