import React, { ReactElement } from "react";
import { observer } from "mobx-react";
import gameStore from "../../services/stores/gameStore";
import timerStore from "../../services/stores/timerStore";
import { convertToHHMMSS } from "../../services/helpers/timerUtils";
import AnimatedIconButton from "../IconButton/AnimatedIconButton";
import './style.scss';

const EndGameMenu: React.FC = (): ReactElement => {
    return (
        <>
            {
                gameStore.unmatchedTiles === 0 && (
                    <div className="end-game-menu-container">
                        <div className="menu">
                            <h1>Вы выиграли!</h1>
                            <h3>Ваше время {convertToHHMMSS(timerStore.secondsPassed)}</h3>
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

const ObservedEndGameMenu = observer(EndGameMenu);

const EndgameMenu: React.FC = (): ReactElement => {
    return <ObservedEndGameMenu />
}

export default EndgameMenu
