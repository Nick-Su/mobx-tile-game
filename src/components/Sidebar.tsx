import React, { ReactElement } from 'react';
import timerStore from '../services/stores/timerStore';
import TimerCounter from './timer/TimerCounter';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface SidebarProps {
    setIsNewGameMenuOpened: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsNewGameMenuOpened }): ReactElement => {
    const openNewGameMenu = (): void => {
        setIsNewGameMenuOpened(true);
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
