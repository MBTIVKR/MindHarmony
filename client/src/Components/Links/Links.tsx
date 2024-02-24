import { HtmlHTMLAttributes, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom'

interface LinkProps {
  children: ReactNode
  handleClick?: () => void
  className?: string
  path: string
}

const LinkComponent = ({className, path, handleClick, children}: LinkProps) => {
  return (
    <Link className={className} onClick={handleClick} to={path}>
        {children}
    </Link>
  );
};

const NavLinkComponent = ({className, path, handleClick, children}: LinkProps) => {
  return (
    <NavLink className={className} onClick={handleClick} to={path}>
        {children}
    </NavLink>
  );
};

const Label = ({className, children, ...props}: HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={className} {...props}>{children}</div>
  )
}

NavLinkComponent.Label = Label
LinkComponent.Label = Label

export {LinkComponent, NavLinkComponent};