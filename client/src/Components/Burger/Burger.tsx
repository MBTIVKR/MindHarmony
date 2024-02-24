import { FC } from 'react';
import { Menu } from 'lucide-react';
import './Burger.scss';

export type TBurger = {
  handleMenu: () => void;
};

const Burger: FC<TBurger> = ({ handleMenu }) => {
  return (
    <div className='header__icon border-r-4' onClick={handleMenu}>
      <Menu color='#CDB79E' />
    </div>
  );
};

export { Burger };
