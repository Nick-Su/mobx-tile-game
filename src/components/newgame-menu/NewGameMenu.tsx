import React, { useState } from 'react';
import { observe } from 'mobx';
import store from '../../store';
import Messages from '../Messages';

import './style.scss';


const NewGameMenu = () => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);
    const [playgroundSize, setPlaygroundSize] = useState<number>(2);

    observe(store, 'isNewGameMenuOpened', change => {
        setIsMenuOpened(!!(change.newValue))
    })

    const playGame = (): void => {
        store.savePlaygroundSize(playgroundSize);
        store.setIsNewMenuOpened(false);
        store.startGame();
        setIsMenuOpened(false)
    }

    const incrementCounter = () => {
        const newSize = playgroundSize + 2;
        
        if (newSize < 12) {
            setPlaygroundSize(playgroundSize + 2)
        }
    }

    const decrementCounter = () => {
        const newSize = playgroundSize - 2;

        if (newSize > 0) {
            setPlaygroundSize(playgroundSize - 2)
        }
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
                            <button 
                                onClick={incrementCounter} 
                                className="reset-style"
                            >
                                <i className="arrow-icon fas fa-chevron-up"></i>
                            </button>
                            <button onClick={decrementCounter} className="reset-style">
                                <i className="arrow-icon fas fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                    <Messages playgroundSize={playgroundSize}/>    
                    <button type="button" onClick={playGame} className="play-btn">Играть!</button>
                </div>
            </div>
        }
        </>
    )
}

export default NewGameMenu
