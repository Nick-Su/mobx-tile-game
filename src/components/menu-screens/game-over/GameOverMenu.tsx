import React, { ReactElement } from 'react';
import gameStore from '../../../services/stores/gameStore';
import AnimatedIconButton from '../../AnimatedIconButton/AnimatedIconButton';

import './style.scss';

interface GameOverMenuProps {
    setIsNewGameMenuOpened: (value: boolean) => void;
}

const GameOverMenu: React.FC<GameOverMenuProps> = ({ setIsNewGameMenuOpened }): ReactElement => {
    return (
        <>
            {
                gameStore.isGameOver && (
                <div className="gameover-menu-container">
                        <div className="menu">
                            <h1>Время вышло!</h1>
                            <AnimatedIconButton
                                clickHandler={() => setIsNewGameMenuOpened(true) }
                                fontAwesomeClasses="playAgainIcon fas fa-redo"
                                btnClasses='reset-style'
                            />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default GameOverMenu;
