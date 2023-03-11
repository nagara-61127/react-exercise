import React, { useState } from 'react';
import './reset.css';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Sanmoku from './sanmoku-narabe';
import ShoppingList from './shopping-list';
import ConnectFour from './connect-four';

type appInfo = {
  id: number;
  enName: string;
  jpName: string;
};

const App = () => {
  const [display, setDisplay] = useState<string>('sanmoku-narabe');

  const switchDisplay = (changeTo: string) => {
    setDisplay(changeTo);
  };

  const appList: appInfo[] = [
    {
      id: 0,
      enName: 'sanmoku-narabe',
      jpName: '三目並べ',
    },
    {
      id: 1,
      enName: 'shopping-list',
      jpName: '買い物リスト',
    },
    {
      id: 2,
      enName: 'connect-four',
      jpName: 'コネクトフォー',
    },
    {
      id: 3,
      enName: 'on-develop',
      jpName: '開発中',
    },
  ];

  return (
    <div className="base">
      <div className="header">
        <ul className="app-list">
          {appList.map((app, index) => (
            <li
              className={
                'app-item ' + (display === app.enName ? 'selected' : '')
              }
              onClick={() => switchDisplay(app.enName)}
            >
              {app.jpName}
            </li>
          ))}
        </ul>
      </div>
      <div className="app-background">
        {display === 'sanmoku-narabe' ? (
          <Sanmoku />
        ) : display == 'shopping-list' ? (
          <ShoppingList />
        ) : display == 'connect-four' ? (
          <ConnectFour />
        ) : (
          <p>開発中です</p>
        )}
      </div>
    </div>
  );
};

{
  /* <li
            className={'app-item ' + (display === 'test' ? 'selected' : '')}
            onClick={() => switchDisplay('test')}
          >
            test
          </li>
          <li
            className={'app-item ' + (display === 'aiueo' ? 'selected' : '')}
            onClick={() => switchDisplay('aiueo')}
          >
            aiueo
          </li> */
}

export default App;
