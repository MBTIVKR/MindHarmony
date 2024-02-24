import { EmptyCard } from '@/Components'
import React, { HtmlHTMLAttributes, ReactNode, forwardRef } from 'react'

import './CompoundSection.scss'
import { refProps } from '@/Pages/AccountPage/AccountPage'

interface CompoundSectionProps {
    children?: ReactNode
    className?: string
    title: JSX.Element
    card: JSX.Element
    referens?: (node?: Element | null | undefined) => void
  }

  interface CardProps {
    title: string
    label: string
    className?: string
  }
  
const CompoundSection = ({card, title}: CompoundSectionProps) => {
  return (
    <div className='compoundSection'>
            <div  className="compoundSection__wrapper">
                {title}
                <div className="compoundSection__list">
                    {card}
                </div>
            </div>
    </div>
  )
}

const Title = ({className, children, ...props}: HtmlHTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={"compoundSection__title section-title " + className} {...props}>{children}</div>
    )
}


const Card = ({label, title, className, ...props}: CardProps) => {
    return (
        <EmptyCard className={'compoundSection__card border-r-4 ' + className} { ...props}>
            <EmptyCard.Title className='compoundSection__card-title'>{title}</EmptyCard.Title>
            <EmptyCard.Button className='compoundSection__card-btn'>{label}</EmptyCard.Button>
        </EmptyCard>
    );
  }
CompoundSection.Title = Title
CompoundSection.Card = Card

export {CompoundSection}