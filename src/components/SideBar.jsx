import React from 'react';
import { Link } from 'react-router-dom';

export const SideBar = () => {
  return (
    <div className='side__bar'>
      <div className='side__bar__item'>
        <Link to='/'>Рестораны</Link>
      </div>
      <div className='side__bar__item'>
        <Link>Пользователи</Link>
      </div>
      <div className='side__bar__item'>
        <Link>Меню</Link>
      </div>
      <div className='side__bar__item'>
        <Link>Заказы</Link>
      </div>
    </div>
  );
};
