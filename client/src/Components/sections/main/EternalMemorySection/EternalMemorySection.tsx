import React from 'react'
import { CompoundCard, List } from '@/Components'

import './EternalMemorySection.scss'
import { data, IData } from './data'

const EternalMemorySection = () => {
  return (
    <section className='eternalMemory'>
        <div className="container">
            <div className="eternalMemory__wrapper">
                <div className="eternalMemory__title section-title section-title-lines">ВЕЧНАЯ ПАМЯТЬ</div>
                <div className="eternalMemory__subtitle section-subtitle">Исследуйте жизни тех, кто оставил свой след в цифровом мире. Каждая карточка – это отдельная история, заслуживающая внимания</div>
                <div className="eternalMemory__list">
                    <List 
                        data={data} 
                        mapperData={(item: IData) => (
                            <CompoundCard>
                                <CompoundCard.Image className='compoundCard__img' src={item.img} />
                                <CompoundCard.Title className='compoundCard__title'>{item.title}</CompoundCard.Title>
                                <CompoundCard.Birthday className='compoundCard__birthday'>{item.birthday}</CompoundCard.Birthday>
                                <CompoundCard.Description className='compoundCard__description'>{item.description}</CompoundCard.Description>
                            </CompoundCard>
                        )}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export {EternalMemorySection}