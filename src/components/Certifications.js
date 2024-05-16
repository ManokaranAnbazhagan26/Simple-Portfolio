import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import endpoints from '../constants/endpoints';
import Header from './Header';
import CustomCard from './Custom/CustomCard';
import FallbackSpinner from './FallbackSpinner';
import { Container, Row, Col } from 'react-bootstrap';
import "../css/darkbackground.css";

function Certifications(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.certifications, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);


  return (
    <div id="/certifications">
    <div id="stars" />
    <div id="stars2" />
    <div id="stars3" />
      <Header title={header} />
      {data ? (
        <div className="certifications-container">
          <Container
            style={{ height: '60vh', width: '100vw', overflowY: 'scroll', overflowX: 'hidden' }}>
            <Row>
              {data.certifications &&
                data.certifications.map((cert) => (
                  <Col md={4} key={cert.title}>
                    <CustomCard SectionType={cert} />
                  </Col>
                ))}
            </Row>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </div>
  );
}

Certifications.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Certifications;
