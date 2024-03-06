import { RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import Routing from './Routing/Router';
import { useEffect } from 'react';
import { useAuth } from '@/Store';
import { APP_MODE } from '@/Share/Variables';

function App() {
  const chaekAuth = useAuth((state) => state.chaekAuth);

  useEffect(() => {
    chaekAuth().then((data) => {
      if (APP_MODE == 'dev') {
        console.log(data);
      }
    });
  }, []);
  return <RouterProvider router={Routing()} />;
}

export default App;
