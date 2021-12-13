import React from 'react'
import store from '../store'

import './styles/MainContainer.scss'

const MenuContainer: React.FC = () => {
    const openNewGameMenu = () => {
        store.setIsNewMenuOpened(true);
    }

    return <button type="button" onClick={openNewGameMenu}>Новая игра</button>
}

export default MenuContainer
