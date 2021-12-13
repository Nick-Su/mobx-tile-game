import React, { ReactElement } from 'react';
import './style.scss'

interface ITileProps {
    isOpen: boolean,
    value: string,
    clickHandler(): void
}

const Tile: React.FC<ITileProps> = ({ isOpen, value, clickHandler}): ReactElement => {
    return (
        <div 
            className="tile-container"
            onClick={clickHandler}
            style={{ background: isOpen ? `#${value}` : `linear-gradient(#e66465, #9198e5)` }}
        >
        </div>
    )
}

export default Tile
