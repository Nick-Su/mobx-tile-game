import React, { ReactElement, useState } from 'react';
import Sidebar from '../components/Sidebar';
import NewGameMenu from '../components/menu-screens/newgame-menu/NewGameMenu';
import WinMenu from '../components/menu-screens/win-menu/WinMenu';
import GameOverMenu from '../components/menu-screens/game-over/GameOverMenu';
import './styles/MainContainer.scss';
import TilesContainer from './TilesContainer';


const MainContainer: React.FC = (): ReactElement => {
    const [isNewGameMenuOpened, setIsNewGameMenuOpened] = useState<boolean>(true);
    const [isYouWin, setIsYouWin] = useState<boolean>(false);

    const isYouWinHandler = (value: boolean) => {
        setIsYouWin(value)
    }

    return (
        <div className="main-container">
            isYW {isYouWin.toString()}
            <div className="playground">
                <TilesContainer setIsYouWin={(value: boolean) => isYouWinHandler(value)} />
            </div>
            <div className="game-menu">
                <Sidebar setIsNewGameMenuOpened={(value: boolean) => setIsNewGameMenuOpened(value)} />
            </div>
            <NewGameMenu
                isNewGameMenuOpened={isNewGameMenuOpened}
                setIsYouWin={(value: boolean) => isYouWinHandler(value)}
                setIsNewGameMenuOpened={(value: boolean) => setIsNewGameMenuOpened(value)}
            />
            { isYouWin && 
              <WinMenu 
                isYouWin={isYouWin} 
                setIsNewGameMenuOpened={(value: boolean) => setIsNewGameMenuOpened(value)} 
            />
            }
            <GameOverMenu setIsNewGameMenuOpened={(value: boolean) => setIsNewGameMenuOpened(value)} />
        </div>
    )
}

export default MainContainer
