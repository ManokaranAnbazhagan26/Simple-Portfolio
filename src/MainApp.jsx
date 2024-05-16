import React, { useState, useEffect, Suspense } from 'react';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import endpoints from './constants/endpoints';
import Socialicons from './components/Social';
import Footer from './components/Footer';
import styled from 'styled-components';

const SectionContainer = styled.div`
  padding: 2rem 0;
`;

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, { method: 'GET' })
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
              return (
                <SectionContainer key={route.headerTitle}>
                  <SectionComponent header={route.headerTitle} />
                </SectionContainer>
              );
            })}
        </Suspense>
      </main>
      <Socialicons />
      <Footer />
    </div>
  );
}

export default MainApp;