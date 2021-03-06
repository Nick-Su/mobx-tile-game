import React, { ReactElement, useState, useEffect} from 'react';
import gameStore from '../services/stores/gameStore';
import timerStore from '../services/stores/timerStore';
import recordStore from '../services/stores/recordStore';
import Tile from '../components/tile/Tile';
import { ITile } from '../services/models/ITile';
import { 
    generateTiles,
    isTilesMatch,
    markTilesAsMatched,
    openTile,
    closeTiles,
} from '../services/helpers/tiles';

interface TilesContainerProps {
    setIsYouWin: (value: boolean) => void;
    isGameStarted: boolean;
}

const TilesContainer: React.FC<TilesContainerProps> = ({setIsYouWin, isGameStarted }): ReactElement => {
    const [tiles, setTiles] = useState<ITile[]>([]);
    const [openedTiles, setOpenedTiles] = useState<number[]>([]);
    const [unmatchedTiles, setUnmatchedTiles] = useState<number>(1);

    let nextRowPointer = 0;

    useEffect(() => {
        if (isGameStarted) {
            setTiles(generateTiles(gameStore.boardSize))
            setUnmatchedTiles(gameStore.boardSize * gameStore.boardSize);
        } else {
            setTiles([]);
            setOpenedTiles([]);
        }
    }, [isGameStarted]);

    useEffect(() => {
        if (unmatchedTiles === 0) {
            timerStore.stopTimer();
            recordStore.saveBestTime(timerStore.secondsPassed);
            setIsYouWin(true)
        }
    }, [unmatchedTiles])

    useEffect(() => {
        // if 2 tiles opened, compare values
        if (openedTiles.length !== 2) {
            return
        }

        if (isTilesMatch(tiles, openedTiles)) {
            markTilesAsMatched(tiles, openedTiles)
            setUnmatchedTiles(unmatchedTiles - 2);
        } else {
            // close tiles
            setTimeout(() => {setTiles(closeTiles(tiles))}, 500);
        }

        setOpenedTiles([]);
    }, [openedTiles])


    const onTileClick = (id: number) => {
        setTiles(openTile(tiles, id));

        // add tileId to opened tiles
        if (openedTiles.length < 2) {
            setOpenedTiles([...openedTiles, id])
        } 
    }

    return (
        <>
            {
                tiles.map((tile: ITile): ReactElement => {
                    nextRowPointer++
        
                    if (nextRowPointer > gameStore.boardSize) { nextRowPointer = 1; }
                    
                    return (
                        <React.Fragment key={tile.id}>
                            <Tile
                                isOpen={tile.isOpen}
                                value={tile.value}
                                isMatched={tile.isMatched}
                                clickHandler={() => { onTileClick(tile.id)}} 
                            />
                            { nextRowPointer === gameStore.boardSize && <br />}
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}

export default TilesContainer
