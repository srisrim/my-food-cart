import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { createRoot } from 'react-dom/client';
import Header from './components/header';
import Body from './components/Body';
import ErrorPage from './components/error';
import Login from './components/login';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from './utils/UserContext';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import appStore from './store/appStore';
const Cart = lazy(() => import('./components/Cart'));
const Demo = lazy(() => import('./components/Demo'));

export function App() {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: 'Sri Sri M'
    }
    setUserName(data.name);
  }, [])
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{isLoggedIn: userName}}>
        <div>
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
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
            },
            {
              path: '/cart',
              element: 
                <Suspense fallback={<span>Loading...</span>}>
                  <Cart />
                </Suspense>
            },
            {
              path: '/demo',
              element:
                <Suspense fallback={<span>Loading</span>}>
                  <Demo />
                </Suspense>
            }
        ]
    },
]);

const container = document.getElementById('app');
const root = createRoot(container);
root.render( <RouterProvider router={appRouter} />);
    
