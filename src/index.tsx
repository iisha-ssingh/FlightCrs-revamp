import React from 'react';
import { createRoot } from 'react-dom/client';
// import { RouterProvider, createBrowserRouter } from 'rescriptuter-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import Routers from './navigation/routes';
// import { BASE_URL } from './utils/constants';
import App from './App';

{/* <RouterProvider
  router={createBrowserRouter(Routers, { basename: BASE_URL })}
/> */}
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);
