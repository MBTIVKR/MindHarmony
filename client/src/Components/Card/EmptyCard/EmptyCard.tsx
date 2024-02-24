import React, { HtmlHTMLAttributes, ReactNode } from 'react'

interface EmptyCardProps {
    children: ReactNode
    className: string
  }
const EmptyCard = ({children, className}: EmptyCardProps) => {
  return (
    <div className={'border-r-4 ' + className}>
        {children}
    </div>
  )
}

const Title = ({className, children, ...props}: HtmlHTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={className} {...props}>{children}</div>
    )
}


const Button = ({className,children, ...props}: HtmlHTMLAttributes<HTMLButtonElement>) => {
    return (
      <button className={className} { ...props}>{children}</button>
    );
  }
EmptyCard.Title = Title
EmptyCard.Button = Button

export {EmptyCard}