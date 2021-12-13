import React from 'react'
import store from '../services/stores/gameStore';
import timerStore from '../services/stores/timerStore';
import TimerCounter from '../components/timer/TimerCounter'
import './styles/MainContainer.scss'

const MenuContainer: React.FC = () => {
    const openNewGameMenu = () => {
        store.setIsNewMenuOpened(true);
        timerStore.stopTimer();
    }

    return (
        <>
            <TimerCounter />
            <button type="button" onClick={openNewGameMenu}>Новая игра</button>
        </>
    )
}

export default MenuContainer
