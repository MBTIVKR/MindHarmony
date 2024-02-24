import { HtmlHTMLAttributes, ImgHTMLAttributes, ReactNode } from "react"

import './CompoundForm.scss'

interface CompoundFromProps {
    children: ReactNode
    className?: string
  }
interface TitleRowProps {
    title?: string
    label?: string
}
  
  const CompoundFrom = ({children, className}: CompoundFromProps) => {
    return (
      <div className={'compoundFrom border-r-4 ' + className}>
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

  
const TitleRow = ({className, children, label, title, ...props}: HtmlHTMLAttributes<HTMLDivElement> & TitleRowProps) => {
    return (
      <div className={'TitleRow ' + className} {...props}>
            <div className="TitleRow__title">{title}</div>
            <div className="TitleRow__data">{children}</div>
            <button className="TitleRow__btn">{label}</button>
      </div>
    )
  }
  

  const Row = ({className, children, title,  ...props}: HtmlHTMLAttributes<HTMLDivElement> & TitleRowProps) => {
    return (
        <div className={'row ' + className} {...props}>
            <div className="row__title">{title}</div>
            <div className={"row__data " + className} {...props}>{children}</div>
        </div>
    )
  }
  

  CompoundFrom.Image = Image
  CompoundFrom.TitleRow = TitleRow
  CompoundFrom.Row = Row

export {CompoundFrom};