import { Outlet } from 'react-router-dom';
import { NavbarMinimal as Sidebar } from '@/Components/Features/Layouts';
import { Container } from '@mantine/core';
//? Layout Component - содержит компоненты виджетов по-умолчанию, которые необходимо отображать на каждой странице

const Layout = () => {
  return (
    <>
      <Sidebar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export { Layout };
