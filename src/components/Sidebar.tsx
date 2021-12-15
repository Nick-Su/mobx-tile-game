import React, { ReactElement } from 'react'
import gameStore from '../services/stores/gameStore';
import timerStore from '../services/stores/timerStore';
import TimerCounter from './timer/TimerCounter';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Sidebar: React.FC = (): ReactElement => {
    const openNewGameMenu = (): void => {
        gameStore.setIsNewMenuOpened(true);
        timerStore.stopTimer();
    }

    return (
        <>
            <TimerCounter />
            <Button 
                size='small'
                color='primary'
                variant="contained"
                startIcon={<PlayArrowIcon />} 
                onClick={openNewGameMenu}
            >
                Новая игра
            </Button>
        </>
    )
}

export default Sidebar
