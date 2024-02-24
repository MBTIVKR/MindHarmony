import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, NavLinkComponent } from '@/Components'
import { links, TLinkEternalMemory } from './links'

import './HeaderEternalMemory.scss'
import { Search } from 'lucide-react'

const HeaderEternalMemory = () => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

  return (
    <header className="headerEternalMemory">
        <div className="container">
            <div className="headerEternalMemory__wrapper">
                <List
                    data={links}
                    mapperData={(item: TLinkEternalMemory) => (
                        <div className='headerEternalMemory__navlink'>
                            <NavLinkComponent 
                                path={item.path}>
                                <NavLinkComponent.Label>{item.label}</NavLinkComponent.Label>
                            </NavLinkComponent>
                        </div>
                    )}
                />
                <div className="headerEternalMemory__flexInput">
                    <div className="headerEternalMemory__flexInput-icon">
                        <Search color='#CDB79E'/>
                    </div>
                    <input 
                        placeholder='Найти страницу'
                        type="text" 
                        className='headerEternalMemory__flexInput-input'
                        onChange={handleInputChange}
                        value={inputValue}/>
                </div>
            </div>
        </div>
    </header>
  )
}

export {HeaderEternalMemory}