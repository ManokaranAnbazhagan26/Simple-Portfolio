import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Home fetch error:', err));
  }, []);

  return data ? (
    <Container>
      <div id="stars" />
      <div id="stars2" />
      <div id="stars3" />
      <Fade>
        <div id="/" className="mainContainer">
          {data.profilePic && (
            <img src="/public/images/" alt="" />
            // <img
            //   src={data.profilePic.source}
            //   alt={"mano"}
            //   style={{
            //     width: data.profilePic.width,
            //     height: data.profilePic.height,
            //     borderRadius: data.profilePic['border-radius'],
            //     objectFit: data.profilePic['object-fit'],
            //     marginBottom: data.profilePic['margin-bottom'],
            //   }}
            // />
          )}
          <h1 className="nameStyle">Manokaran</h1>
          <div style={{ flexDirection: 'row' }}>
            <h2 className="inlineChild">I'm </h2>
            <span>&nbsp;</span>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data.roles,
              }}
            />
          </div>
          <div className="gap" />
          {data.paragraph && (
            <Row className="justify-content-center">
              <Col md={10}>
                {data.paragraph[0].split('. ').map((p, index) => (
                  <p key={index} className="paragraph">
                    {p}.
                  </p>
                ))}
              </Col>
            </Row>
          )}
        </div>
      </Fade>
    </Container>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;