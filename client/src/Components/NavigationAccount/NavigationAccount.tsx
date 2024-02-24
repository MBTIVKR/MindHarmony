import React from 'react';
import { List } from '..';
import { INavigation, data } from './navigation';
import { Link } from 'react-router-dom';

import './NavigationAccount.scss';

interface NavigationAccountProps {
  entryId: string | undefined;
  viewCard?: boolean;
}

const NavigationAccount = ({ entryId, viewCard }: NavigationAccountProps) => {
  return (
    <div className='navigationAccount'>
      <List
        data={data}
        mapperData={(item: INavigation) => (
          <a
            href={'#' + item.id}
            className={
              entryId === item.id
                ? 'navigationAccount__link activeSection'
                : 'navigationAccount__link'
            }
          >
            <div className='navigationAccount__label'>{item.label}</div>
          </a>
        )}
      />
    </div>
  );
};

export { NavigationAccount };
