import { List } from '@/Components'
import React from 'react'
import { icons } from './data'

import './Footer.scss'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className="container">
            <div className="footer__wrapper">
                <div className="footer__list">
                    <List
                        data={icons}
                        mapperData={(item) => (
                            <div className="footer__link">{item.icon}</div>
                        )}
                    />
                </div>
            </div>
        </div>
    </footer>
  )
}

export {Footer}