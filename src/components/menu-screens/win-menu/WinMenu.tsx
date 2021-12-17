import React, { ReactElement } from "react";
import timerStore from "../../../services/stores/timerStore";
import { convertToHHMMSS } from "../../../services/helpers/timerUtils";
import AnimatedIconButton from "../../AnimatedIconButton/AnimatedIconButton";
import recordStore from "../../../services/stores/recordStore";
import './style.scss';

interface IsYouWinProps {
    isYouWin: boolean;
    setIsNewGameMenuOpened: (value: boolean) => void;
}

const WinMenu: React.FC<IsYouWinProps> = ({ isYouWin, setIsNewGameMenuOpened}): ReactElement => {
    return (
        <>
            {
                isYouWin && (
                    <div className="end-game-menu-container">
                        <div className="menu">
                            <h1>Вы выиграли!</h1>
                            <h3>Ваше время {convertToHHMMSS(timerStore.secondsPassed)}</h3>
                            { recordStore.isNewRecord && <h2>Новый рекорд!</h2>}
                            <AnimatedIconButton
                                clickHandler={() => { setIsNewGameMenuOpened(true) }}
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

export default WinMenu
