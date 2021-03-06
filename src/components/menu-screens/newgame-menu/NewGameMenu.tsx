import { ReactElement, useEffect, useState } from 'react';
import gameStore, { GameMode } from '../../../services/stores/gameStore';
import timerStore from '../../../services/stores/timerStore';
import Messages from '../../Messages';
import AnimatedIconButton from '../../AnimatedIconButton/AnimatedIconButton';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './style.scss';

export const handleTimer = function() {
    setInterval(() => timerStore.increaseTimer(), 1000)
};

interface NewGameMenuProps {
    isNewGameMenuOpened: boolean;
    setIsYouWin: (value: boolean) => void;
    setIsNewGameMenuOpened: (value: boolean) => void;
    setIsGameStarted: (value: boolean) => void;
}
const NewGameMenu: React.FC<NewGameMenuProps> = ({ setIsYouWin, isNewGameMenuOpened, setIsNewGameMenuOpened, setIsGameStarted }): ReactElement => {
    const [playgroundSize, setPlaygroundSize] = useState<number>(2);
    
    useEffect(() => {
        setIsGameStarted(false)
    }, [])


    const playTrainingMode = (): void => {
        setIsGameStarted(true);
        setIsNewGameMenuOpened(false);
        setIsYouWin(false);
        gameStore.saveBoardSize(playgroundSize);
        gameStore.setGameMode(GameMode.Training);
        timerStore.resetTimer();
        timerStore.startTimer();
    }

    const playCountdownMode = (): void => {
        setIsGameStarted(true);
        setIsNewGameMenuOpened(false);
        setIsYouWin(false);
        gameStore.saveBoardSize(playgroundSize);
        gameStore.setGameMode(GameMode.Countdown);
        timerStore.stopTimer();
        timerStore.startCountdownTimer();
    }

    const incrementCounter = (): void => {
        const newSize = playgroundSize + 2;
        if (newSize < 12) { setPlaygroundSize(playgroundSize + 2) }
    }

    const decrementCounter = (): void => {
        const newSize = playgroundSize - 2;
        if (newSize > 0) { setPlaygroundSize(playgroundSize - 2) }
    }

    return (
        <>
        {
            isNewGameMenuOpened &&
            <div className="menu-container">
                <div className="menu">
                    <h1>?????????? ????????</h1>
                    <h3>???????????? ????????</h3>
                    <div className="input-container">
                        <div className="counter-container">
                            <span>{ `${playgroundSize} X ${playgroundSize}`}</span>
                        </div>
                        <div className="counter-button-container">
                            <div className="arrow-container">
                                <AnimatedIconButton
                                    clickHandler={incrementCounter}
                                    fontAwesomeClasses="arrow-icon fas fa-chevron-up"
                                    btnClasses='reset-style'
                                />
                            </div>

                            <div className="arrow-container">
                                <AnimatedIconButton
                                    clickHandler={decrementCounter}
                                    fontAwesomeClasses="arrow-icon fas fa-chevron-down"
                                    btnClasses='reset-style'
                                />
                            </div>
                        </div>
                    </div>
                    <Messages playgroundSize={playgroundSize}/>
                    <div className="playmode-btn-container">
                        <Button 
                            size='large'
                            color='secondary'
                            variant="contained"
                            startIcon={<PlayArrowIcon />} 
                            onClick={playCountdownMode}
                        >
                            ???? ??????????
                        </Button>
                        <Button 
                            size='large'
                            color='warning'
                            variant="contained"
                            startIcon={<PlayArrowIcon />} 
                            onClick={playTrainingMode}
                        >
                            ????????????????????
                        </Button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default NewGameMenu
