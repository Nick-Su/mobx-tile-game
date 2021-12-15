import React, { ReactElement } from 'react';
import Sidebar from '../components/Sidebar';
import NewGameMenu from '../components/menu-screens/newgame-menu/NewGameMenu';
import TilesContainer from './TilesContainer';
import EndgameMenu from '../components/menu-screens/win-menu/WinMenu';
import GameOverMenu from '../components/menu-screens/game-over/GameOverMenu';
import './styles/MainContainer.scss';

const MainContainer: React.FC = (): ReactElement => {
    return (
        <div className="main-container">
            <div className="playground">
                <TilesContainer />
            </div>
            <div className="game-menu">
                <Sidebar />
            </div>
            <NewGameMenu />
            <EndgameMenu />
            <GameOverMenu />
        </div>
    )
}

export default MainContainer
