import React, { HtmlHTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'

import './CompoundCard.scss'

interface CompoundCardProps {
  children: ReactNode
}

const CompoundCard = ({children}: CompoundCardProps) => {
  return (
    <div className='compoundCard border-r-4'>
        {children}
    </div>
  )
}

const Image = ({className, ...props}: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <div className={className} >
      <img {...props}/>
    </div>
  )
}

const Title = ({className, children, ...props}: HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className} {...props}>{children}</div>
  )
}

const Birthday = ({className, children, ...props}: HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className} {...props}>{children}</div>

  )
}

const Description = ({className, children, ...props}: HtmlHTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={className} {...props}>{children}</p>
  )
}

CompoundCard.Image = Image
CompoundCard.Title = Title
CompoundCard.Birthday = Birthday
CompoundCard.Description = Description

export {CompoundCard}

