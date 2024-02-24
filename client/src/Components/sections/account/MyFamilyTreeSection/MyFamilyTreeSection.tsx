import { EmptyCard } from '@/Components'
import React from 'react'

import { CompoundSection } from '../..'
import './MyFamilyTreeSection.scss'
import { refProps } from '@/Pages/AccountPage/AccountPage'

const MyFamilyTreeSection = ({refrence}: refProps) => {
  return (
    <section id='familyTree' ref={refrence} className='myCard'>
      <CompoundSection
        title={<CompoundSection.Title >МОЕ СЕМЕЙНОЕ ДРЕВО</CompoundSection.Title>}
        card={<CompoundSection.Card className='myFamilyTree__card' label='СОЗДАТЬ ДРЕВО' title='Вы еще не создали свое семейное древо' />}
        />
    </section>
  )
}

export {MyFamilyTreeSection}