// import React, { useState, useEffect, useCallback } from 'react';
// // import { createBrowserHistory } from 'history';
// // import { Outlet } from 'react-router-dom';
// import { Global, css } from '@emotion/react';
// import SvgService from '../utils/SvgService';
// import { onServer } from '../utils/browserOrServer';
// // import Layout from './common/Layout';
// // import { ROUTING_INFO } from '../utils/constants';
// import '../../public/css/style.scss';

// function App() {
//   const [loaded, setLoaded] = useState(false);
//   const [svgService, setSvgService] = useState(null);

//   const handleBeforeUnload = useCallback(() => {
//     window.location.reload();
//   }, []);

//   const handlePopstate = useCallback(() => {
//     if (window.history.state && window.history.state.refresh) {
//       window.location.reload();
//     }
//   }, []);

//   useEffect(() => {
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     window.addEventListener('popstate', handlePopstate);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       window.removeEventListener('popstate', handlePopstate);
//     };
//   }, [handleBeforeUnload, handlePopstate]);

//   useEffect(() => {
//     const dynamicFileFetch = () =>
//       import(
//         /* webpackChunkName:"LayoutSvgList" */ './common/Layout/Layout.svgs'
//       );
//     const eventToRegister = 'load';
//     const rerenderParent = () => setLoaded(true);
//     const eventTarget = onServer ? {} : window;
//     const newSvgService = new SvgService(
//       dynamicFileFetch,
//       eventToRegister,
//       rerenderParent,
//       eventTarget
//     );
//     setSvgService(newSvgService);
//   }, []);

//   const getPageInfo = useCallback((pathname) => {
//     const item = pathname.split('/');
//     return ROUTING_INFO[item[item.length - 1]];
//   }, []);

//   const loc = {
//     pathname: '/booking/search',
//   };
//   const history = createBrowserHistory({ initialEntries: [loc] });
//   const getSVG = svgService ? svgService.getSVG : () => {};
//   const pageClassess = 'main-container';

//   const blurValue = css`
//     filter: blur(5px);
//     -o-filter: blur(5px);
//     -ms-filter: blur(5px);
//     -moz-filter: blur(5px);
//     -webkit-filter: blur(5px);
//   `;
//   const GlobalStyle = css`
//     .screenBlur {
//       #app {
//         ${blurValue}
//       }
//       .blurModal {
//         background: transparent;
//         ${blurValue}
//       }
//     }
//   `;

//   return (
//     <>
//       <Global styles={GlobalStyle} />
//       <Layout
//         router={history}
//         getPageInfo={getPageInfo}
//         className={pageClassess}
//         getSVG={getSVG}
//         loaded={loaded}
//       >
//         <Outlet />
//       </Layout>
//     </>
//   );
// }

// export default App;


import React from 'react';
import CreateFlightBookings from './pages/formView';

const App: React.FC = () => {
  return (
    <div>
      <CreateFlightBookings />
    </div>
  );
}

export default App;