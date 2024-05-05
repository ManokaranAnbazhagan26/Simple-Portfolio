import React, { useState, useEffect, Suspense } from 'react';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import endpoints from './constants/endpoints';
import Socialicons from './components/Social';



function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
        {data &&
            data.sections.map((route) => {
              const SectionComponent = React.lazy(() =>
                import('./components/' + route.component)
              );
              return <SectionComponent key={route.headerTitle} header={route.headerTitle} />;
            })}
        </Suspense>
      </main>
      <Socialicons />
    </div>
  );
}

export default MainApp;