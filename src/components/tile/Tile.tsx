import React, { ReactElement } from 'react';
import './style.scss'

interface ITileProps {
    isOpen: boolean;
    value: string;
    isMatched: boolean;
    clickHandler(): void;
}

const closedTileColor = 'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)';
const Tile: React.FC<ITileProps> = ({ isOpen, value, isMatched, clickHandler}): ReactElement => {
    const toggleTile = () => {
        if (!isMatched) {
            clickHandler()
        }
    }
    
    return (
        <div 
            className="tile-container"
            onClick={toggleTile}
            style={{ background: isOpen ? `#${value}` : closedTileColor }}
        >
        </div>
    )
}

export default Tile
