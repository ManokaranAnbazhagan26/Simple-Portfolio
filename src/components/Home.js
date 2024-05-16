import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import { Container, Row, Col } from 'react-bootstrap';
import "../css/darkbackground.css";

const styles = {
  nameStyle: {
    fontSize: '5em',
    '@media (max-width: 768px)': {
      fontSize: '3em',
    },
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    padding: '5rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      padding: '2rem',
    },
  },
  profilePic: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    '@media (max-width: 768px)': {
      width: '150px',
      height: '150px',
    },
  },
  paragraph: {
    fontSize: '1.2rem',
    lineHeight: '1.5',
    fontFamily: 'Georgia, serif',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
      lineHeight: '1.3',
    },
  },
  gap: {
    marginTop: '0.75rem',
    marginBottom: '2rem',
  },
};

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
        <div id="/" style={styles.mainContainer}>
          {data.profilePic && (
            <img
              src={data.profilePic.source}
              alt={data.name}
              style={{
                width: data.profilePic.width,
                height: data.profilePic.height,
                borderRadius: data.profilePic['border-radius'],
                objectFit: data.profilePic['object-fit'],
                marginBottom: data.profilePic['margin-bottom'],
              }}
            />
          )}
          <h1 style={styles.nameStyle}>{data.name}</h1>
          <div style={{ flexDirection: 'row' }}>
            <h2 style={styles.inlineChild}>I'm </h2>
            <span>&nbsp;</span>
            <Typewriter
              options={{
                loop: true,
                autoStart: true,
                strings: data.roles,
              }}
            />
          </div>
          <div style={styles.gap} />
          {data.paragraph && (
            <Row className="justify-content-center">
              <Col md={10}>
                {data.paragraph[0].split('. ').map((p, index) => (
                  <p key={index} style={styles.paragraph}>
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