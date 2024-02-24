import React from 'react'
import { CompoundSection } from '../..'

import './MyManualCapsul.scss'
import { refProps } from '@/Pages/AccountPage/AccountPage'

const MyManualCapsul = ({refrence}: refProps) => {
  return (
    <section id='manualCapsule' ref={refrence} className='myCard'>
      <CompoundSection
        title={<CompoundSection.Title >МОЯ КАПСУЛА ВРЕМЕНИ</CompoundSection.Title>}
        card={<CompoundSection.Card className='myManualCapsule__card' label='СОЗДАТЬ КАПСУЛУ' title='У вас нет ни одной капсулы' />}
      />
    </section>
  )
}

export {MyManualCapsul}