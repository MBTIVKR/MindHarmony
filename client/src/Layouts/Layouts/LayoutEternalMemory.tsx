
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { HeaderEternalMemory } from '..'
import { Menu } from '@/Components'
import { useMenu } from '@/Utils/Hooks'
import { Paths } from '@/App/Routes/types/Paths'

const LayoutEternalMemory = () => { 
  return (  
    <>
        <HeaderEternalMemory/>
        <Outlet/>
    </>
  )
}

export {LayoutEternalMemory}