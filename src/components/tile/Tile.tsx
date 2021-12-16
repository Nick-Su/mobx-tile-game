import React, { ReactElement } from 'react';
import './style.scss'

interface ITileProps {
    isOpen: boolean;
    value: string;
    isMatched?: boolean;
    clickHandler(): void;
}

const Tile: React.FC<ITileProps> = ({ isOpen, value, isMatched, clickHandler}): ReactElement => {
    const toggleTile = () => {
        if (!isMatched) {
            clickHandler()
        }
        console.log('tile click')
    }
    
    return (
        <div 
            className="tile-container"
            onClick={toggleTile}
            style={{ background: isOpen ? `#${value}` : `linear-gradient(#e66465, #9198e5)`}}
            
        >
        </div>
    )
}

export default Tile
