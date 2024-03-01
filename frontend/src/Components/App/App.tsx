import { RouterProvider } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import Routing from './Routing/Router';

function App() {
  return <RouterProvider router={Routing()} />;
}

export default App;
