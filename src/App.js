import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { createRoot } from 'react-dom/client';
import Header from './components/header';
import Body from './components/Body';
import ErrorPage from './components/error';
import Login from './components/login';
import RestaurantMenu from './components/RestaurantMenu';

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const appRouter = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path:'/',
                element: <Body/>
            },
            {
              path:'/login',
              element: <Login />
            },
            {
              path: '/restaurant/:id',
              element: <RestaurantMenu />
            }
        ]
    },
]);

const container = document.getElementById('app');
const root = createRoot(container);
root.render( <RouterProvider router={appRouter} />);
    
