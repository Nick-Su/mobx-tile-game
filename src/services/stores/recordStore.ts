import { makeAutoObservable } from "mobx";
import { ITimeRecord } from "../models/ITimeRecord";
import gameStore, { GameMode } from "./gameStore";

const checkIsBestTime = (currentSeconds: number): boolean => {
    if (gameStore.gameMode !== GameMode.Training) {
        return false;
    }

    const rawTimeRescords = localStorage.getItem('timeRecords');
    
    // if localstorage is totally empty
    if (!rawTimeRescords) {
        const recordData = [{boardSize: gameStore.boardSize, bestTime: currentSeconds}];
        localStorage.setItem('timeRecords', JSON.stringify(recordData));
        return true;
    }

    let timeRecords = JSON.parse(rawTimeRescords);

    for (let i = 0; i < timeRecords.length; i++) {
        if (timeRecords[i].boardSize === gameStore.boardSize) {
            if (timeRecords[i].bestTime > currentSeconds) {
                timeRecords[i].bestTime = currentSeconds;
                localStorage.setItem('timeRecords', JSON.stringify(timeRecords));
                return true;
            }
            return false;
        }
    }

    const newRecord: ITimeRecord = {
        boardSize: gameStore.boardSize,
        bestTime: currentSeconds
    }

    timeRecords.push(newRecord);
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords));

    return true;
}

class TimeRecord {
    isNewRecord: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setIsNewRecord(value: boolean) {
        this.isNewRecord = value;
    }

    saveBestTime(seconds: number) {
        this.isNewRecord = checkIsBestTime(seconds)
    }
}

const recordStore = new TimeRecord();

export default recordStore;
