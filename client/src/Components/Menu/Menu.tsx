import { FC } from 'react';
import { List, NavLinkComponent } from '..';
import { Link } from 'react-router-dom';
import { links, TLink } from './links';
import { X } from 'lucide-react';
import './Menu.scss';

interface IBurgerProps {
  activeMenu: boolean;
  handleMenu: () => void;
}

const Menu: FC<IBurgerProps> = ({ activeMenu, handleMenu }) => {
  return (
    <div className={activeMenu ? 'menu active' : 'menu'}>
      <div className='menu__content'>
        <div onClick={handleMenu} className='menu__burgerbtn border-r-4'>
          <X />
        </div>
        <div className='menu__content-wrapper'>
          <List
            data={links}
            mapperData={(item) => (
                <div className="menu__linkWrap">
                  <NavLinkComponent className='menu__link' handleClick={handleMenu} path={item.path}>
                    <NavLinkComponent.Label className='menu__label'>{item.label}</NavLinkComponent.Label>
                  </NavLinkComponent>
                </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export { Menu };
