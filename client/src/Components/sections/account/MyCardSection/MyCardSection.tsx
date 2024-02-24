import React from 'react'

import './MyCardSection.scss'
import { EmptyCard } from '@/Components'
import { CompoundSection } from '../..'
import { refProps } from '@/Pages/AccountPage/AccountPage'
import { useInView } from 'react-intersection-observer'



const MyCardSection = ({refrence}: refProps) => {

  return (
    <section id='cards' ref={refrence} className='myCard'>
      <CompoundSection
        title={<CompoundSection.Title >МОИ КАРТОЧКИ</CompoundSection.Title>}
        card={<CompoundSection.Card className='myCard__card' label='СОЗДАТЬ КАРТОЧКУ' title='У вас нет созданных карточек' />}
      />
    </section>
  )
}

export {MyCardSection}