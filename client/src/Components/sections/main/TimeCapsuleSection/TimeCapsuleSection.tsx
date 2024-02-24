import React from 'react'
import tm from '@/Assets/img/tmanual.jpeg'
import './TimeCapsuleSection.scss'

const TimeCapsuleSection = () => {
  return (
    <section className='timeCapsule'>
        <div className="container">
            <div className="timeCapsule__wrapper">
                <div className="timeCapsule__title section-title section-title-lines">КАПСУЛА ВРЕМЕНИ</div>
                <div className="timeCapsule__subtitle section-subtitle">Этот инструмент поможет вам использовать каждый оставшийся год вашей жизни с наивысшей продуктивностью</div>
                <div className="timeCapsule__flex">
                    <div className="timeCapsule__content">
                        <div className="timeCapsule__content-title">В разработке</div>
                        <div className="timeCapsule__content-subtitle">СЮДА ТЕКСТА НАДО НАБРОСАТЬ</div>
                        <button className='timeCapsule__content-btn timeCapsule-animated-button'>
                            <span>ИССЛЕДОВАТЬ</span>
                            <span></span>
                        </button>
                    </div>
                    <div className="timeCapsule__img">
                        <img src={tm} alt="tm" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export {TimeCapsuleSection}