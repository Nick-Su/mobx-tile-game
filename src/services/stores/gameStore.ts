import { makeAutoObservable } from "mobx";
import { ITile } from "../models/ITile";
import timerStore from "./timerStore";

const generateTiles = (playgroundSize: number): ITile[] => {
    const numberOfPairs = playgroundSize * playgroundSize;
    let tiles: ITile[] = [];
    let tilesValues: string[] = [];

    // generate numberOfPairs/2 different values
    for (let i = 0; i < numberOfPairs / 2; i++) {
       const tileValue = Math.floor(Math.random()*16777215).toString(16); 
       tilesValues.push(tileValue, tileValue);
    }

    // shuffle values
    for (let i = tilesValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tilesValues[i], tilesValues[j]] = [tilesValues[j], tilesValues[i]];
    }

    tilesValues.forEach((item) => {
        tiles.push({
            id: Math.floor(Math.random() * 10000000),
            isOpen: false,
            value: item,
            isMatched: false,
        });
    });

    return tiles;
}

export enum GameMode {
    Countdown = 'Countdown',
    Training = 'Training',
}

class Game {
    isNewGameMenuOpened: boolean = false;
    playgroundSize: number = 4;
    tiles: ITile[] = [];
    openedTilesIds: number[] = [];
    unmatchedTiles: number = 8;
    gameMode: string = GameMode.Training;
    isGameOver: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsNewMenuOpened(value: boolean) {
        this.isNewGameMenuOpened = value
    }

    savePlaygroundSize(size: number) {
        this.playgroundSize = size;
    }

    startGame() {
        this.tiles = generateTiles(this.playgroundSize);
        this.unmatchedTiles = this.playgroundSize * this.playgroundSize;
    }

    closeOpenedTiles() {
        this.tiles.forEach((tile: ITile) => {
            if (tile.id === this.openedTilesIds[0] || tile.id === this.openedTilesIds[1]) {
                tile.isOpen = false;
            }
        });

        this.openedTilesIds = [];
        this.tiles = [...this.tiles];
    }

    isOpenedTwoTiles() {
        return this.openedTilesIds.length < 2 ? false : true
    }

    isTileMatched(id: number) {
        return this.tiles.filter((tile: ITile) => {
            if (tile.id === id) {
                return tile;
            }

            return undefined
        })[0].isMatched;
    }

    checkIsOpenedTilesMatched() {
        const tiles = this.tiles.filter((tile: ITile) => {
            return tile.id === this.openedTilesIds[0] || tile.id === this.openedTilesIds[1]
        })

        if (tiles.length === 2 && tiles[0].value === tiles[1].value) {
            this.tiles.forEach((tile: ITile) => {
                if (tile.id === this.openedTilesIds[0] || tile.id === this.openedTilesIds[1]) {
                    tile.isMatched = true;
                }
            })

            this.tiles = [...this.tiles];
            this.unmatchedTiles = this.unmatchedTiles - 2;

            if (this.unmatchedTiles === 0) { timerStore.stopTimer() }
            this.openedTilesIds = [];

            return true
        }
        return false
    }

    toggleTile(id: number) {
        if (!this.isOpenedTwoTiles() && !this.isTileMatched(id)) {
            this.openedTilesIds.push(id)
            this.tiles.forEach((tile: ITile) => {
                if (tile.id === id) {
                    tile.isOpen = !tile.isOpen
                }
            });
        }

        if (this.isOpenedTwoTiles()) {
            if(!this.checkIsOpenedTilesMatched()) {
                setTimeout(() => this.closeOpenedTiles(), 700)
            }
        }
    }

    setGameMode(gameMode: string) {
        this.isGameOver = false;
        this.gameMode = gameMode;
    }

    setIsGameOver(value: boolean) {
        this.isGameOver = value;
    }
}

const gameStore = new Game();

export default gameStore;
