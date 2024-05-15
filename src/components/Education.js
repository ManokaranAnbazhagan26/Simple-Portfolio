import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import endpoints from '../constants/endpoints';
import '../css/education.css';
import "../css/darkbackground.css";
// import 'react-chrono/dist/react-chrono.esm.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  return (
    <div id="/education">
    <div id="stars" />
    <div id="stars2" />
    <div id="stars3" />
      <Header title={header} />
      {data ? (
        <Container style={{ height: '60vh' }}>
          <Fade>
            <div>
              <Chrono
                items={data.education}
                mode="VERTICAL_ALTERNATING"
                allowDynamicUpdate
                useReadMore={false}
                theme={{
                  primary: theme.accentColor,
                  cardBgColor: theme.cardBgColor,
                  cardForeColor: theme.cardForeColor,
                  cardSubtitleColor: theme.chronoTheme.cardSubtitleColor,
                  titleColor: theme.titleColor,
                  titleColorActive: theme.chronoTheme.titleColorActive,
                }}
                iconSrc={(icon) => icon.src}
              />
            </div>
          </Fade>
        </Container>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;