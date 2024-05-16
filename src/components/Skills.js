import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import CustomCard from './Custom/CustomCard'; 
import PropTypes from 'prop-types';

const Skills = (props) => {
  const { header } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div id="/skills">
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container>
            <Row>
              {data.skills &&
                data.skills.map((skill) => (
                  <Col md={3} key={skill.title}>
                    <CustomCard SectionType={skill} />
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

Skills.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Skills;
