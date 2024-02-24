import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { HeaderMain } from '..'
import { Menu } from '@/Components'
import { useMenu } from '@/Utils/Hooks'
import { Paths, PathsEternalMemory } from '@/App/Routes/types/Paths'

const LayoutMain = () => { 
    const [title, setTitle] = useState<string>('')
    const location = useLocation().pathname
    const {activeMenu, handleMenu} = useMenu()


    useEffect(() => {
        switch (location) {
            case Paths.Home:
              setTitle('ЦЕНТР ВОСПОМИНАНИЙ')
              break;
            case Paths.Account:
              setTitle('ПЕРСОНАЛЬНЫЕ ДАННЫЕ')
              break;
            case PathsEternalMemory.EternalMemory:
            case PathsEternalMemory.Question: 
            case PathsEternalMemory.Faq: 
            case PathsEternalMemory.Price: 
            case PathsEternalMemory.Working: 
              setTitle('ВЕЧНАЯ ПАМЯТЬ')
              break;
            default:
              setTitle('Дефолтный заголовок')
          }
    }, [location])


  return (  
    <>
        <HeaderMain location={location} title={title} handleMenu={handleMenu} activeMenu={activeMenu}/>
        <Menu handleMenu={handleMenu} activeMenu={activeMenu}/>
        <Outlet/>
    </>
  )
}

export {LayoutMain}