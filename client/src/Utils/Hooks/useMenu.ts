import {useState} from 'react'

export const useMenu = () => {
    const [activeMenu, setActiveMenu] = useState<boolean>(false)
    const handleMenu = () => {
        setActiveMenu(value => !value)
    }

    return {activeMenu, handleMenu}

}