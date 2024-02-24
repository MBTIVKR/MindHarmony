import React from 'react'
import calendar from '@/Assets/img/calendar.svg'
import '../TimeCapsuleSection/TimeCapsuleSection.scss'
import './CalendarLifeSection.scss'

const CalendarLifeSection = () => {
  return (
    <section className='calendarLife'>
        <div className="container">
            <div className="calendarLife__wrapper">
                <div className="calendarLife__title section-title section-title-lines">КАПСУЛА ВРЕМЕНИ</div>
                <div className="calendarLife__subtitle section-subtitle">Этот инструмент поможет вам использовать каждый оставшийся год вашей жизни с наивысшей продуктивностью</div>
                <div className="calendarLife__block">
                    <div className="calendarLife__block-title">В разработке</div>
                    <div className="calendarLife__flex">
                        <div className="calendarLife__img">
                            <img src={calendar} alt="tm" />
                        </div>
                        <div className="calendarLife__flex-content">
                            <div className="calendarLife__content-text">
                            Календарь жизни - это интерактивный раздел, который предоставляет возможность отмечать и сохранять важные даты и события в жизни. Этот раздел предназначен для создания цифрового архива и памятника, где можно хранить информацию о ключевых моментах в жизни ушедших родственников
                            Вы можете отмечать дни рождения, годовщины брака, дни ухода из жизни и другие важные события. Каждой дате можно прикреплять различные материалы, такие как фотографии, аудио и видеозаписи, текстовые воспоминания и другие документы. Это создает виртуальный календарь, который становится своеобразным архивом важных моментов в жизни семьи
                            </div>
                            <button className='calendarLife__content-btn'>
                                <span>ИССЛЕДОВАТЬ</span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export {CalendarLifeSection}