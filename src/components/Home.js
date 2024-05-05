import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    padding: '30rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  paragraph: {
    padding: '5rem'
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
    <Fade>
      <div id='/' style={styles.mainContainer}>
        {data.profilePic && (
          <img
            src={data.profilePic.source}
            alt={data.name} // Use the name property as the alt text
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
          <h2 style={styles.inlineChild}>I'm </h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data.roles,
            }}
          />
         </div>
        {data.paragraph && (
          <div style={styles.paragraph}>
            {data.paragraph[0].split('. ').map((p, index) => (
              <p key={index}>{p}.</p>
            ))}
          </div>
        )}

      </div>
    </Fade>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
