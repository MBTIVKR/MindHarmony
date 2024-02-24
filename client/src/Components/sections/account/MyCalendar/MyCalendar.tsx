import React from 'react'
import { CompoundSection } from '../..'

import './MyCalendar.scss'
import { refProps } from '@/Pages/AccountPage/AccountPage'

const MyCalendar = ({refrence}: refProps) => {
  return (
    <section id='myCalendar' ref={refrence} className='myCard'>
      <CompoundSection
        title={<CompoundSection.Title >МОЙ КАЛЕНДАРЬ ЖИЗНИ</CompoundSection.Title>}
        card={<CompoundSection.Card className='myCalender__card' label='СОЗДАТЬ' title='Вы еще не создали свой календарь жизни' />}
      />
    </section>
  )
}

export {MyCalendar}