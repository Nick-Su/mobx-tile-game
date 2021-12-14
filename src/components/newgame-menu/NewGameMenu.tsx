import { ReactElement, useState } from 'react';
import { observe } from 'mobx';
import store from '../../services/stores/gameStore';
import timerStore from '../../services/stores/timerStore';
import Messages from '../Messages';
import AnimatedIconButton from '../IconButton/AnimatedIconButton';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './style.scss';

export const handleTimer = function() {
    setInterval(() => timerStore.increaseTimer(), 1000)
};

const NewGameMenu: React.FC = (): ReactElement => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);
    const [playgroundSize, setPlaygroundSize] = useState<number>(2);

    observe(store, 'isNewGameMenuOpened', change => {
        setIsMenuOpened(!!(change.newValue))
    })

    const playGame = (): void => {
        store.savePlaygroundSize(playgroundSize);
        store.setIsNewMenuOpened(false);
        store.startGame();
        setIsMenuOpened(false);

        timerStore.stopTimer();
        timerStore.resetTimer();
        timerStore.startTimer();
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
            isMenuOpened &&
            <div className="menu-container">
                <div className="menu">
                    <h1>Новая игра</h1>
                    <h3>Размер поля</h3>
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
                    <br />
                    <Button 
                        size='large'
                        color='success'
                        variant="contained"
                        startIcon={<PlayArrowIcon />} 
                        onClick={playGame}
                    >
                        Играть!
                    </Button>
                </div>
            </div>
        }
        </>
    )
}

export default NewGameMenu
