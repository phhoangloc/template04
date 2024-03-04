import React from 'react'
import { useState } from 'react'
import store from '@/redux/store'

type Props = {}

const ArchiveTest = (props: Props) => {
    const [currentMenu, setCurrentMenu] = useState<boolean>(store.getState().menu)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    return (
        <div className={`main ${currentMenu ? "main_while_menu_open" : ""}`}>
            test
        </div>
    )
}

export default ArchiveTest