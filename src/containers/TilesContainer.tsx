import React, { ReactElement, useEffect } from 'react';
import { observer } from "mobx-react";
import store from '../services/stores/gameStore';
import Tile from '../components/tile/Tile';

const ObservedTilesContainer: React.FC = (): ReactElement => {
    useEffect(() => {
    }, [store.tiles])

    const tileClickHandler = (id: number): void => {
        store.toggleTile(id)
    }

    const TileRenderer = (): ReactElement => {
        let counter = 0;
        const result = store.tiles.map((item) => {
            counter++

            if (counter >  store.playgroundSize) {
                counter = 1;
            }
            
            return (
                <React.Fragment key={item.id}>
                    <Tile isOpen={item.isOpen} value={item.value} clickHandler={() => tileClickHandler(item.id)} />
                    { counter === store.playgroundSize && <br />}
                </React.Fragment>
            )
        })
        return <>{ result }</>
    }
    return <TileRenderer />
}

const ObservedTilesListContainer = observer(ObservedTilesContainer);

const TilesContainer: React.FC = (): ReactElement => {
    
    return <ObservedTilesListContainer />
}

export default TilesContainer
