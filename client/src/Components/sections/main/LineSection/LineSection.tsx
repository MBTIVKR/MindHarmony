import React from 'react'

import './LineSection.scss'
import { Link } from 'react-router-dom'
import { PathsEternalMemory } from '@/App/Routes/types/Paths'

const LineSection = () => {
  return (
    <section className='lineSection'>
        <div className="lineSection__wrapper">
            <div className="lineSection__title">ТУТ НУЖЕН ТЕКСТ, ЧТОБЫ ПОЛЬЗОВАТЕЛЬ КЛИКНУЛ НА BTN И ПЕРЕШЕЛ НА ОСНОВНУЮ СТРАНИЦУ ЭТОГО БЛОКА</div>
            <Link className='lineSection__link' to={PathsEternalMemory.EternalMemory}>
              <button className='lineSection__btn animated-button'>
                <span>УЗНАТЬ БОЛЬШЕ</span>
                <span></span>
              </button>
            </Link>
        </div>
    </section>
  )
}

export {LineSection}