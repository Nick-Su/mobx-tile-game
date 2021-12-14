import React, { ReactElement } from 'react';
import Sidebar from './Sidebar';
import NewGameMenu from '../components/newgame-menu/NewGameMenu';
import TilesContainer from './TilesContainer';
import EndgameMenu from '../components/endgame-menu/Endgame-menu';
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
        </div>
    )
}

export default MainContainer
