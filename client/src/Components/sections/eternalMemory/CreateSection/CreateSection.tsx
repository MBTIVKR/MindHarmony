import React from 'react'
import wooman from '@/Assets/img/WomanCard.svg'
import { CompoundCard } from '@/Components'
import './CreateSection.scss'

const CreateSection = () => {
  return (
    <section className='createSection'>
        <div className="container">
            <div className="createSection__wrapper">
                <div className="createSection__conent">
                    <div className="createSection__conent-text"></div>
                    <button className='createSection__conent-btn animated-button'>
                        <span>СОЗДАТЬ СТРАНИЦУ</span>
                        <span></span>
                    </button>
                </div>
                <div className="createSection__card">
                    <CompoundCard>
                        <CompoundCard.Image src={wooman}/>
                        <CompoundCard.Title className='compoundCard__title'>Одри Хепберн</CompoundCard.Title>
                        <CompoundCard.Birthday className='compoundCard__birthday'>1929 - 1993</CompoundCard.Birthday>
                        <CompoundCard.Description className='compoundCard__description'>Признанная икона киноиндустрии и стиля, пик карьеры которой пришелся на золотой век Голливуда, получила премию BAFTA в знак признания ее актерских достижений</CompoundCard.Description>
                    </CompoundCard>
                </div>
            </div>
        </div>
    </section>
  )
}

export {CreateSection}