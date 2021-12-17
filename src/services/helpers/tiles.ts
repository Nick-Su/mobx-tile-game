import { ITile } from "../models/ITile";

export const generateTiles = (playgroundSize: number): ITile[] => {
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

export const isTilesMatch = (tiles: ITile[], tileIds: number[]): boolean => {
    const filtredTiles = tiles.filter((tile: ITile) => {
        return tile.id === tileIds[0] || tile.id === tileIds[1]
    });

    return filtredTiles.length === 2 && filtredTiles[0].value === filtredTiles[1].value ? true : false;
}

export const markTilesAsMatched = (tiles: ITile[], tileIds: number[]): ITile[] => {
    return tiles.map((tile: ITile) => {
        if (tile.id === tileIds[0] || tile.id === tileIds[1]) {
            tile.isMatched = true;
        }
        return tile;
    });
}

export const openTile = (tiles: ITile[], id: number): ITile[] => {
    return tiles.map((tile: ITile) => {
        if (tile.id === id) {
            tile.isOpen = true;
        }
        return tile;
    });
}

export const closeTiles = (tiles: ITile[]): ITile[] => {
    return tiles.map((tile: ITile) => {
        if (tile.isOpen) {
            tile.isOpen = false;
        }
        return tile;
    });
}