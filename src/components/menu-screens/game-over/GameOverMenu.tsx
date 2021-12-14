import React, { ReactElement } from 'react';
import { observer } from "mobx-react";
import gameStore from '../../../services/stores/gameStore';
import AnimatedIconButton from '../../AnimatedIconButton/AnimatedIconButton';

import './style.scss';

const OloMenu: React.FC = (): ReactElement => {
    return (
        <>
            {
                gameStore.isGameOver && (
                <div className="gameover-menu-container">
                        <div className="menu">
                            <h1>Время вышло!</h1>
                            <AnimatedIconButton
                                clickHandler={() => { gameStore.setIsNewMenuOpened(true)}}
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

const ObservedGameOverMenu = observer(OloMenu);

const GameOverMenu: React.FC = (): ReactElement => {
    return <ObservedGameOverMenu />   
}

export default GameOverMenu;
