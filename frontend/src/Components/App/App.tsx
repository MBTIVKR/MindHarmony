import { RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import Routing from './Routing/Router';
import { useEffect } from 'react';
import { useAuth } from '@/Store/store';

function App() {
  const chaekAuth = useAuth((state) => state.chaekAuth);

  useEffect(() => {
    chaekAuth().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <RouterProvider router={Routing()} />
  );
}

export default App;
