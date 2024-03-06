import { Paths, PathsDashboard } from '@/Components/App/Routing';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavbarMinimal as Sidebar } from '@/Components/Features/Layouts';
import { Container } from '@mantine/core';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === Paths.Dashbord) {
      navigate(PathsDashboard.Main);
    }
  }, [navigate, location]);

  return (
    <>
      <Sidebar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Home;
