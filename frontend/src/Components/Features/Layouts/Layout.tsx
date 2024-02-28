import { Outlet } from 'react-router-dom';
import { NavbarMinimal as Sidebar } from '@/Components/Features/Layouts';
//? Layout Component - содержит компоненты виджетов по-умолчанию, которые необходимо отображать на каждой странице

const Layout = () => {
  return (
    <div className='flex__container'>
			<Sidebar />
      <Outlet />
    </div>
  );
};

export { Layout };
