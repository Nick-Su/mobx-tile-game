import React, { ReactElement } from 'react';
import { observer } from "mobx-react";
import gameStore from '../services/stores/gameStore';
import Tile from '../components/tile/Tile';
import { ITile } from '../services/models/ITile';

const ObservedTilesContainer: React.FC = (): ReactElement => {
    let counter = 0;
    return (
        <>
            {
                gameStore.tiles.map((item: ITile): ReactElement => {
                    counter++
        
                    if (counter > gameStore.playgroundSize) { counter = 1; }
                    
                    return (
                        <React.Fragment key={item.id}>
                            <Tile isOpen={item.isOpen} value={item.value} clickHandler={() => { gameStore.toggleTile(item.id)}}/>
                            { counter === gameStore.playgroundSize && <br />}
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}

const ObservedTilesListContainer = observer(ObservedTilesContainer);

const TilesContainer: React.FC = (): ReactElement => {
    return <ObservedTilesListContainer />
}

export default TilesContainer
