import React, { ReactElement, useState } from "react";
import { observe } from 'mobx';
import store from "../../services/stores/gameStore";
import timerStore from "../../services/stores/timerStore";
import { convertToHHMMSS } from "../../services/helpers/timerUtils";

import './style.scss';

const EndgameMenu: React.FC = (): ReactElement => {
    const [isOpened, setIsEngGameMenuOpened] = useState<boolean>(false);

    observe(store, 'unmatchedTiles', change => {
        if (change.newValue === 0) {
            setTimeout(() => setIsEngGameMenuOpened(true), 300)
        }
    });

    timerStore.stopTimer();

    const playAgain = (): void => {
        store.setIsNewMenuOpened(true)
        setIsEngGameMenuOpened(false)
    }

    return (
        <>
            { isOpened && 
            <div className="end-game-menu-container">
                <div className="menu">
                    <h1>Вы выиграли!</h1>
                    <h3>Ваше время {convertToHHMMSS(timerStore.secondsPassed)}</h3>
                    <button type="button" onClick={playAgain}>
                        <i className="playAgainIcon fas fa-redo"></i>
                    </button>
                </div>
            </div>
            }
        </>
    )
}

export default EndgameMenu
