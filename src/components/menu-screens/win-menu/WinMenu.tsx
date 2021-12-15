import React, { ReactElement } from "react";
import { observer } from "mobx-react";
import gameStore from "../../../services/stores/gameStore";
import timerStore from "../../../services/stores/timerStore";
import { convertToHHMMSS } from "../../../services/helpers/timerUtils";
import AnimatedIconButton from "../../AnimatedIconButton/AnimatedIconButton";
import recordStore from "../../../services/stores/recordStore";
import './style.scss';

const Menu: React.FC = (): ReactElement => {
    return (
        <>
            {
                gameStore.unmatchedTiles === 0 && (
                    <div className="end-game-menu-container">
                        <div className="menu">
                            <h1>Вы выиграли!</h1>
                            <h3>Ваше время {convertToHHMMSS(timerStore.secondsPassed)}</h3>
                            { recordStore.isNewRecord && <h2>Новый рекорд!</h2>}
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

const ObservedEndGameMenu = observer(Menu);

const EndgameMenu: React.FC = (): ReactElement => {
    return <ObservedEndGameMenu />
}

export default EndgameMenu
